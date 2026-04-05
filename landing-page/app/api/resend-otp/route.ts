// app/api/resend-otp/route.ts
import { NextResponse } from 'next/server';
import { securityService } from '@/app/lib/security-service';

export async function POST(request: Request) {
  const { mobile } = await request.json();
  
  // Get client IP
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Check if IP is blocked
  if (securityService.isIPBlocked(ip)) {
    return NextResponse.json({ 
      success: false, 
      message: 'Too many requests. Please try again later.' 
    }, { status: 429 });
  }
  
  // Check remaining attempts
  const remainingAttempts = securityService.getRemainingResendAttempts(mobile);
  if (remainingAttempts <= 0) {
    securityService.reportSuspicious(mobile, ip, 'Resend limit exceeded');
    return NextResponse.json({ 
      success: false, 
      message: 'Maximum resend limit reached. Please try again after 1 hour.' 
    }, { status: 429 });
  }
  
  // Check cooldown
  const cooldown = securityService.checkResendCooldown(mobile);
  if (!cooldown.allowed) {
    return NextResponse.json({ 
      success: false, 
      message: `Please wait ${cooldown.waitTime} seconds before resending OTP.`,
      waitTime: cooldown.waitTime
    }, { status: 429 });
  }
  
  const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY!;
  const MSG91_TEMPLATE_ID = process.env.MSG91_OTP_TEMPLATE_ID!;
  
  // Generate new OTP
  const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
  
  try {
    const response = await fetch('https://api.msg91.com/api/v5/otp/retry', {
      method: 'POST',
      headers: {
        'authkey': MSG91_AUTH_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile: `91${mobile}`,
        template_id: MSG91_TEMPLATE_ID,
        otp: newOtp
      })
    });
    
    const data = await response.json();
    
    if (data.type === 'success') {
      // Update stored OTP
      securityService.storeOTP(mobile, newOtp);
      securityService.recordAttempt(mobile, 'mobile');
      securityService.recordAttempt(ip, 'ip');
      
      const newRemainingAttempts = securityService.getRemainingResendAttempts(mobile);
      
      return NextResponse.json({ 
        success: true, 
        message: 'OTP resent successfully',
        remainingAttempts: newRemainingAttempts,
        warning: newRemainingAttempts === 0 ? 'This was your last resend attempt.' : undefined
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: data.message || 'Failed to resend OTP' 
      });
    }
    
  } catch (error) {
    console.error('Resend Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error resending OTP' 
    }, { status: 500 });
  }
}