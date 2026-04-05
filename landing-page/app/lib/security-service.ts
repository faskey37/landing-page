// lib/security-service.ts
import { NextRequest } from 'next/server';

interface RateLimitRecord {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
  blockedUntil?: number;
  suspiciousCount: number;
}

interface OTPRecord {
  otp: string;
  expiresAt: number;
  attempts: number;
  verified: boolean;
  createdAt: number;
}

class SecurityService {
  private static instance: SecurityService;
  private rateLimitStore: Map<string, RateLimitRecord> = new Map();
  private otpStore: Map<string, OTPRecord> = new Map();
  private blockedIPs: Map<string, number> = new Map();

  static getInstance(): SecurityService {
    if (!SecurityService.instance) {
      SecurityService.instance = new SecurityService();
    }
    return SecurityService.instance;
  }

  // Check if IP is blocked
  isIPBlocked(ip: string): boolean {
    const blockedUntil = this.blockedIPs.get(ip);
    if (blockedUntil && Date.now() < blockedUntil) {
      return true;
    }
    if (blockedUntil && Date.now() >= blockedUntil) {
      this.blockedIPs.delete(ip);
    }
    return false;
  }

  // Block IP for suspicious activity
  blockIP(ip: string, duration: number = parseInt(process.env.OTP_BLOCK_DURATION || '86400000')): void {
    this.blockedIPs.set(ip, Date.now() + duration);
  }

  // Check rate limit for mobile number
  checkMobileRateLimit(mobile: string): { allowed: boolean; message?: string; waitTime?: number } {
    const key = `mobile:${mobile}`;
    const record = this.rateLimitStore.get(key);
    const now = Date.now();
    const windowMs = parseInt(process.env.OTP_RATE_LIMIT_WINDOW || '3600000');
    const maxAttempts = parseInt(process.env.OTP_RATE_LIMIT_PER_NUMBER || '3');

    if (record) {
      // Check if permanently blocked due to suspicious activity
      if (record.blockedUntil && now < record.blockedUntil) {
        const hoursLeft = Math.ceil((record.blockedUntil - now) / 3600000);
        return { 
          allowed: false, 
          message: `Too many suspicious attempts. Please try again after ${hoursLeft} hours.` 
        };
      }

      // Check if within time window
      if (now - record.firstAttempt < windowMs) {
        if (record.count >= maxAttempts) {
          const waitMinutes = Math.ceil((windowMs - (now - record.firstAttempt)) / 60000);
          return { 
            allowed: false, 
            message: `Maximum OTP requests reached. Please try again after ${waitMinutes} minutes.`,
            waitTime: waitMinutes * 60
          };
        }
      } else {
        // Reset window
        this.rateLimitStore.delete(key);
        return { allowed: true };
      }
    }

    return { allowed: true };
  }

  // Check rate limit for IP address
  checkIPRateLimit(ip: string): { allowed: boolean; message?: string; waitTime?: number } {
    const key = `ip:${ip}`;
    const record = this.rateLimitStore.get(key);
    const now = Date.now();
    const windowMs = parseInt(process.env.OTP_RATE_LIMIT_WINDOW || '3600000');
    const maxAttempts = parseInt(process.env.OTP_RATE_LIMIT_PER_IP || '5');

    if (record) {
      if (now - record.firstAttempt < windowMs) {
        if (record.count >= maxAttempts) {
          const waitMinutes = Math.ceil((windowMs - (now - record.firstAttempt)) / 60000);
          return { 
            allowed: false, 
            message: `Too many requests from this IP. Please try again after ${waitMinutes} minutes.`,
            waitTime: waitMinutes * 60
          };
        }
      } else {
        this.rateLimitStore.delete(key);
      }
    }

    return { allowed: true };
  }

  // Record attempt
  recordAttempt(identifier: string, type: 'mobile' | 'ip'): void {
    const key = `${type}:${identifier}`;
    const record = this.rateLimitStore.get(key);
    const now = Date.now();

    if (record) {
      record.count++;
      record.lastAttempt = now;
      this.rateLimitStore.set(key, record);
    } else {
      this.rateLimitStore.set(key, {
        count: 1,
        firstAttempt: now,
        lastAttempt: now,
        suspiciousCount: 0
      });
    }
  }

  // Report suspicious activity
  reportSuspicious(mobile: string, ip: string, reason: string): void {
    console.warn(`Suspicious activity detected: ${reason} | Mobile: ${mobile} | IP: ${ip}`);
    
    const mobileKey = `mobile:${mobile}`;
    const mobileRecord = this.rateLimitStore.get(mobileKey);
    
    if (mobileRecord) {
      mobileRecord.suspiciousCount = (mobileRecord.suspiciousCount || 0) + 1;
      
      // Block after 3 suspicious activities
      if (mobileRecord.suspiciousCount >= 3) {
        mobileRecord.blockedUntil = Date.now() + parseInt(process.env.OTP_BLOCK_DURATION || '86400000');
        this.rateLimitStore.set(mobileKey, mobileRecord);
      }
    }
    
    // Block IP temporarily
    this.blockIP(ip, 3600000); // Block for 1 hour
  }

  // Store OTP
  storeOTP(mobile: string, otp: string): void {
    this.otpStore.set(mobile, {
      otp,
      expiresAt: Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES || '10') * 60 * 1000),
      attempts: 0,
      verified: false,
      createdAt: Date.now()
    });
  }

  // Verify OTP
  verifyOTP(mobile: string, otp: string, ip: string): { success: boolean; message: string } {
    const record = this.otpStore.get(mobile);
    
    if (!record) {
      return { success: false, message: 'No OTP request found. Please request a new OTP.' };
    }
    
    if (record.verified) {
      return { success: false, message: 'OTP already verified.' };
    }
    
    if (Date.now() > record.expiresAt) {
      this.otpStore.delete(mobile);
      return { success: false, message: 'OTP has expired. Please request a new OTP.' };
    }
    
    if (record.attempts >= parseInt(process.env.MAX_OTP_ATTEMPTS || '3')) {
      this.otpStore.delete(mobile);
      return { success: false, message: 'Too many failed attempts. Please request a new OTP.' };
    }
    
    record.attempts++;
    
    if (record.otp !== otp) {
      this.otpStore.set(mobile, record);
      return { success: false, message: `Invalid OTP. ${parseInt(process.env.MAX_OTP_ATTEMPTS || '3') - record.attempts} attempts remaining.` };
    }
    
    record.verified = true;
    this.otpStore.set(mobile, record);
    
    return { success: true, message: 'OTP verified successfully' };
  }

  // Clean up expired OTPs (run periodically)
  cleanupExpiredOTPs(): void {
    const now = Date.now();
    for (const [key, value] of this.otpStore.entries()) {
      if (now > value.expiresAt) {
        this.otpStore.delete(key);
      }
    }
  }

  // Get remaining resend attempts
  getRemainingResendAttempts(mobile: string): number {
    const key = `mobile:${mobile}`;
    const record = this.rateLimitStore.get(key);
    const maxAttempts = parseInt(process.env.OTP_RATE_LIMIT_PER_NUMBER || '3');
    
    if (!record) return maxAttempts;
    
    const now = Date.now();
    const windowMs = parseInt(process.env.OTP_RATE_LIMIT_WINDOW || '3600000');
    
    if (now - record.firstAttempt < windowMs) {
      return Math.max(0, maxAttempts - record.count);
    }
    
    return maxAttempts;
  }

  // Check resend cooldown
  checkResendCooldown(mobile: string): { allowed: boolean; waitTime?: number } {
    const key = `mobile:${mobile}`;
    const record = this.rateLimitStore.get(key);
    const cooldownSeconds = parseInt(process.env.OTP_RESEND_COOLDOWN || '30');
    
    if (record && record.lastAttempt) {
      const timeSinceLast = (Date.now() - record.lastAttempt) / 1000;
      if (timeSinceLast < cooldownSeconds) {
        return { 
          allowed: false, 
          waitTime: Math.ceil(cooldownSeconds - timeSinceLast)
        };
      }
    }
    
    return { allowed: true };
  }
}

export const securityService = SecurityService.getInstance();

// Run cleanup every hour
setInterval(() => securityService.cleanupExpiredOTPs(), 3600000);