// app/api/resend-otp/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { otpStore } from '@/app/lib/firebase-otp-store';

export async function POST(request: Request) {
  try {
    const { mobile } = await request.json();
    
    console.log('=== RESEND OTP VIA MSG91 ===');
    console.log('Mobile:', mobile);
    
    // Get existing OTP data
    const existingData = await otpStore.get(mobile);
    
    if (!existingData) {
      return NextResponse.json({ 
        success: false, 
        message: 'No OTP request found. Please request a new OTP.' 
      }, { status: 400 });
    }
    
    // Check remaining attempts (max 3 resends)
    const resendCount = existingData.attempts || 0;
    if (resendCount >= 3) {
      return NextResponse.json({ 
        success: false, 
        message: 'Maximum resend limit reached. Please request a new OTP after 1 hour.' 
      }, { status: 429 });
    }
    
    // Check cooldown (60 seconds)
    const expiresAt = existingData.expiresAt;
    const createdAt = new Date(expiresAt.getTime() - 10 * 60 * 1000);
    const now = new Date();
    const timeSinceLastRequest = (now.getTime() - createdAt.getTime()) / 1000;
    
    if (timeSinceLastRequest < 60) {
      const waitTime = Math.ceil(60 - timeSinceLastRequest);
      return NextResponse.json({ 
        success: false, 
        message: `Please wait ${waitTime} seconds before requesting another OTP.`,
        waitTime: waitTime
      }, { status: 429 });
    }
    
    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const newOtpHash = await bcrypt.hash(newOtp, 10);
    
    // MSG91 Configuration
    const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
    const MSG91_TEMPLATE_ID = process.env.MSG91_OTP_TEMPLATE_ID;
    
    if (!MSG91_AUTH_KEY) {
      return NextResponse.json({ 
        success: false, 
        message: 'SMS service not configured.' 
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
        otp: newOtp,
        otp_expiry: parseInt(process.env.OTP_EXPIRY_MINUTES || '10'),
        otp_length: 6
      })
    });
    
    const data = await response.json();
    console.log('MSG91 Resend Response:', data);
    
    if (data.type === 'success') {
      // Update stored OTP
      await otpStore.save(mobile, {
        mobile: existingData.mobile,
        email: existingData.email || '',
        name: existingData.name || '',
        program: existingData.program || '',
        otpHash: newOtpHash,
        attempts: resendCount + 1,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
      });
      
      const newRemainingAttempts = 3 - (resendCount + 1);
      
      console.log(`✅ OTP resent to ${mobile}: ${newOtp}`);
      
      return NextResponse.json({ 
        success: true, 
        message: 'OTP resent successfully to your mobile!',
        remainingAttempts: newRemainingAttempts,
        resendCooldown: 60
      });
    } else {
      console.error('MSG91 Resend Error:', data);
      return NextResponse.json({ 
        success: false, 
        message: data.message || 'Failed to resend OTP'
      });
    }
    
  } catch (error) {
    console.error('Resend Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error resending OTP. Please try again.'
    }, { status: 500 });
  }
}