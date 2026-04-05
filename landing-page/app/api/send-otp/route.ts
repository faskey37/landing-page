// app/api/send-otp/route.ts
import { NextResponse } from 'next/server';
import { securityService } from '@/app/lib/security-service';
import crypto from 'crypto';

export async function POST(request: Request) {
  const { mobile } = await request.json();
  
  // Get client IP
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Generate request fingerprint for bot detection
  const userAgent = request.headers.get('user-agent') || '';
  const acceptLanguage = request.headers.get('accept-language') || '';
  const fingerprint = crypto
    .createHash('sha256')
    .update(`${ip}${userAgent}${acceptLanguage}`)
    .digest('hex');
  
  // Check if IP is blocked
  if (securityService.isIPBlocked(ip)) {
    securityService.reportSuspicious(mobile, ip, 'Blocked IP attempted OTP request');
    return NextResponse.json({ 
      success: false, 
      message: 'Too many suspicious requests. Please try again later.',
      blockDuration: '24 hours'
    }, { status: 429 });
  }
  
  // Validate mobile number format
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(mobile)) {
    securityService.reportSuspicious(mobile, ip, 'Invalid mobile number format');
    return NextResponse.json({ 
      success: false, 
      message: 'Please enter a valid 10-digit Indian mobile number.' 
    });
  }
  
  // Check rate limit for mobile number
  const mobileRateLimit = securityService.checkMobileRateLimit(mobile);
  if (!mobileRateLimit.allowed) {
    return NextResponse.json({ 
      success: false, 
      message: mobileRateLimit.message,
      waitTime: mobileRateLimit.waitTime
    }, { status: 429 });
  }
  
  // Check rate limit for IP
  const ipRateLimit = securityService.checkIPRateLimit(ip);
  if (!ipRateLimit.allowed) {
    securityService.reportSuspicious(mobile, ip, 'IP rate limit exceeded');
    return NextResponse.json({ 
      success: false, 
      message: ipRateLimit.message,
      waitTime: ipRateLimit.waitTime
    }, { status: 429 });
  }
  
  // Check resend cooldown
  const cooldown = securityService.checkResendCooldown(mobile);
  if (!cooldown.allowed) {
    return NextResponse.json({ 
      success: false, 
      message: `Please wait ${cooldown.waitTime} seconds before requesting another OTP.`,
      waitTime: cooldown.waitTime
    }, { status: 429 });
  }
  
  const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY!;
  const MSG91_TEMPLATE_ID = process.env.MSG91_OTP_TEMPLATE_ID!;
  
  // Generate OTP (6 digits)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  try {
    // Send OTP using MSG91
    const response = await fetch('https://api.msg91.com/api/v5/otp', {
      method: 'POST',
      headers: {
        'authkey': MSG91_AUTH_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile: `91${mobile}`,
        template_id: MSG91_TEMPLATE_ID,
        otp_expiry: parseInt(process.env.OTP_EXPIRY_MINUTES || '10'),
        otp_length: 6,
        otp: otp // Send custom OTP
      })
    });
    
    const data = await response.json();
    
    if (data.type === 'success') {
      // Store OTP for verification
      securityService.storeOTP(mobile, otp);
      
      // Record attempts
      securityService.recordAttempt(mobile, 'mobile');
      securityService.recordAttempt(ip, 'ip');
      
      const remainingAttempts = securityService.getRemainingResendAttempts(mobile);
      
      return NextResponse.json({ 
        success: true, 
        message: 'OTP sent successfully',
        order_id: data.order_id,
        remainingAttempts,
        expiryMinutes: parseInt(process.env.OTP_EXPIRY_MINUTES || '10')
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: data.message || 'Failed to send OTP' 
      });
    }
    
  } catch (error) {
    console.error('MSG91 Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error sending OTP. Please try again.' 
    }, { status: 500 });
  }
}