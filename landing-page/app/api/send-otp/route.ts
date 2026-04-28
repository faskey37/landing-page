// app/api/send-otp/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { otpStore } from '@/app/lib/firebase-otp-store';

export async function POST(request: Request) {
  try {
    const { mobile, name, email, program } = await request.json();
    
    console.log('=== SEND OTP VIA MSG91 ===');
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
    
    console.log('✅ OTP stored in Firebase');
    console.log('📱 OTP value:', otp);
    
    // MSG91 Configuration
    const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
    const MSG91_TEMPLATE_ID = process.env.MSG91_OTP_TEMPLATE_ID;
    
    if (!MSG91_AUTH_KEY) {
      console.error('❌ MSG91_AUTH_KEY not configured');
      return NextResponse.json({ 
        success: false, 
        message: 'SMS service not configured. Please contact support.' 
      });
    }
    
    // Send OTP via MSG91
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
        otp_expiry: parseInt(process.env.OTP_EXPIRY_MINUTES || '10'),
        otp_length: 6
      })
    });
    
    const data = await response.json();
    console.log('MSG91 Response:', data);
    
    if (data.type === 'success') {
      console.log(`✅ OTP sent successfully to ${mobile}`);
      return NextResponse.json({ 
        success: true, 
        message: 'OTP sent successfully to your mobile!',
        expiryMinutes: parseInt(process.env.OTP_EXPIRY_MINUTES || '10'),
        requestId: data.request_id
      });
    } else {
      console.error('❌ MSG91 Error:', data);
      return NextResponse.json({ 
        success: false, 
        message: data.message || 'Failed to send OTP. Please try again.'
      });
    }
    
  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error sending OTP: ' + error.message
    });
  }
}