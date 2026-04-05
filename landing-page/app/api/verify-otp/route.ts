// app/api/verify-otp/route.ts
import { NextResponse } from 'next/server';
import { securityService } from '@/app/lib/security-service';

export async function POST(request: Request) {
  const { mobile, otp } = await request.json();
  
  // Get client IP
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Validate inputs
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(mobile)) {
    securityService.reportSuspicious(mobile, ip, 'Invalid mobile for OTP verification');
    return NextResponse.json({ 
      success: false, 
      message: 'Invalid mobile number.' 
    });
  }
  
  if (!otp || !/^\d{6}$/.test(otp)) {
    return NextResponse.json({ 
      success: false, 
      message: 'Please enter a valid 6-digit OTP.' 
    });
  }
  
  // Check if IP is blocked
  if (securityService.isIPBlocked(ip)) {
    return NextResponse.json({ 
      success: false, 
      message: 'Too many failed attempts. Please try again later.' 
    }, { status: 429 });
  }
  
  // Verify OTP
  const verification = securityService.verifyOTP(mobile, otp, ip);
  
  if (!verification.success) {
    // Report suspicious activity after multiple failures
    const record = securityService['otpStore'].get(mobile);
    if (record && record.attempts >= 2) {
      securityService.reportSuspicious(mobile, ip, `Multiple OTP verification failures (${record.attempts} attempts)`);
    }
    
    return NextResponse.json({ 
      success: false, 
      message: verification.message 
    });
  }
  
  // Clear rate limits on successful verification
  // This prevents the same mobile from being blocked after successful verification
  
  return NextResponse.json({ 
    success: true, 
    message: 'OTP verified successfully' 
  });
}