// app/api/send-otp/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { otpStore } from '@/app/lib/firebase-otp-store';

// Helper function to get current hour in IST
function getCurrentHourIST(): number {
  // Create date in IST (UTC+5:30)
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  return istTime.getHours();
}

export async function POST(request: Request) {
  try {
    const { mobile, name, email, program } = await request.json();
    
    console.log('=== SEND OTP ===');
    console.log('Mobile:', mobile);
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Program:', program);
    
    // Validate mobile
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Please enter a valid 10-digit Indian mobile number.' 
      });
    }
    
    // Get current hour in IST
    const currentHour = getCurrentHourIST();
    const isDLTActive = currentHour >= 9 && currentHour < 21;
    
    console.log('IST Hour:', currentHour);
    console.log('DLT Active:', isDLTActive);
    
    // If outside DLT hours (9 PM - 9 AM IST), show message
    if (!isDLTActive) {
      let nextTime = '';
      if (currentHour >= 21) {
        nextTime = 'tomorrow at 9 AM';
      } else {
        nextTime = 'today at 9 AM';
      }
      
      return NextResponse.json({ 
        success: false, 
        message: `SMS service is currently unavailable (9 PM - 9 AM IST). Please try again ${nextTime}.`,
        isTimeRestricted: true,
        currentHour: currentHour
      }, { status: 503 });
    }
    
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    
    // Store in Firebase
    await otpStore.save(mobile, {
      mobile: mobile,
      name: name || '',
      email: email || '',
      program: program || '',
      otpHash: otpHash,
      attempts: 0,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });
    
    console.log('✅ OTP stored, value:', otp);
    
    // Send OTP via MSG91
    const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
    const MSG91_TEMPLATE_ID = process.env.MSG91_OTP_TEMPLATE_ID;
    
    if (!MSG91_AUTH_KEY) {
      return NextResponse.json({ 
        success: false, 
        message: 'SMS service not configured.' 
      });
    }
    
    const response = await fetch('https://api.msg91.com/api/v5/otp', {
      method: 'POST',
      headers: {
        'authkey': MSG91_AUTH_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile: `91${mobile}`,
        template_id: MSG91_TEMPLATE_ID,
        otp: otp,
        otp_expiry: 10,
        otp_length: 6
      })
    });
    
    const data = await response.json();
    console.log('MSG91 Response:', data);
    
    if (data.type === 'success') {
      return NextResponse.json({ 
        success: true, 
        message: 'OTP sent successfully to your mobile!',
        expiryMinutes: 10
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: data.message || 'Failed to send OTP. Please try again.'
      });
    }
    
  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error sending OTP. Please try again.'
    });
  }
}