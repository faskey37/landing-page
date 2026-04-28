// app/lib/security-service.ts

interface RateLimitRecord {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
}

interface ResendRecord {
  lastResendTime: number;
  resendCount: number;
}

class SecurityService {
  private mobileRateLimits: Map<string, RateLimitRecord> = new Map();
  private otpStore: Map<string, { otp: string; expiresAt: number }> = new Map();
  private resendStore: Map<string, ResendRecord> = new Map();
  
  // Configuration - Using values from env
  private readonly MOBILE_LIMIT = parseInt(process.env.OTP_RATE_LIMIT_PER_NUMBER || '3');
  private readonly RESEND_LIMIT = 3; // Max 3 resend attempts per mobile
  private readonly RESEND_COOLDOWN = parseInt(process.env.OTP_RESEND_COOLDOWN || '60'); // seconds
  private readonly RATE_LIMIT_WINDOW = parseInt(process.env.OTP_RATE_LIMIT_WINDOW || '3600000'); // 1 hour in milliseconds
  
  // Check resend cooldown
  checkResendCooldown(mobile: string): { allowed: boolean; waitTime?: number } {
    const record = this.resendStore.get(mobile);
    
    if (!record) {
      return { allowed: true };
    }
    
    const now = Date.now();
    const timeSinceLastResend = (now - record.lastResendTime) / 1000; // in seconds
    
    if (timeSinceLastResend < this.RESEND_COOLDOWN) {
      const waitTime = Math.ceil(this.RESEND_COOLDOWN - timeSinceLastResend);
      return { allowed: false, waitTime };
    }
    
    return { allowed: true };
  }
  
  // Update resend timestamp
  updateResendTimestamp(mobile: string): void {
    const record = this.resendStore.get(mobile);
    const now = Date.now();
    
    if (!record) {
      this.resendStore.set(mobile, {
        lastResendTime: now,
        resendCount: 1
      });
    } else {
      record.lastResendTime = now;
      record.resendCount += 1;
      this.resendStore.set(mobile, record);
    }
  }
  
  // Get remaining resend attempts
  getRemainingResendAttempts(mobile: string): number {
    const record = this.resendStore.get(mobile);
    
    if (!record) {
      return this.RESEND_LIMIT;
    }
    
    // Reset count if window has passed (1 hour)
    const now = Date.now();
    const windowStart = now - this.RATE_LIMIT_WINDOW;
    
    if (record.lastResendTime < windowStart) {
      this.resendStore.delete(mobile);
      return this.RESEND_LIMIT;
    }
    
    const remaining = Math.max(0, this.RESEND_LIMIT - record.resendCount);
    return remaining;
  }
  
  // Store OTP with expiry (using env value)
  storeOTP(mobile: string, otp: string): void {
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || '10');
    const expiresAt = Date.now() + (expiryMinutes * 60 * 1000);
    this.otpStore.set(mobile, { otp, expiresAt });
    
    // Auto-cleanup after expiry
    setTimeout(() => {
      this.otpStore.delete(mobile);
    }, expiryMinutes * 60 * 1000);
  }
  
  // Store OTP with hash
  storeOTPHashed(mobile: string, otpHash: string): void {
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || '10');
    const expiresAt = Date.now() + (expiryMinutes * 60 * 1000);
    this.otpStore.set(mobile, { otp: otpHash, expiresAt });
    
    // Auto-cleanup after expiry
    setTimeout(() => {
      this.otpStore.delete(mobile);
    }, expiryMinutes * 60 * 1000);
  }
  
  // Verify OTP
  verifyOTP(mobile: string, otp: string): boolean {
    const record = this.otpStore.get(mobile);
    
    if (!record) {
      return false;
    }
    
    if (Date.now() > record.expiresAt) {
      this.otpStore.delete(mobile);
      return false;
    }
    
    return record.otp === otp;
  }
  
  // Get OTP data
  getOTPData(mobile: string): { otp: string; expiresAt: number } | undefined {
    const record = this.otpStore.get(mobile);
    
    if (!record) {
      return undefined;
    }
    
    if (Date.now() > record.expiresAt) {
      this.otpStore.delete(mobile);
      return undefined;
    }
    
    return record;
  }
  
  // Check mobile rate limit
  checkMobileRateLimit(mobile: string): { allowed: boolean; message?: string; waitTime?: number } {
    const record = this.mobileRateLimits.get(mobile);
    
    if (!record) {
      return { allowed: true };
    }
    
    const now = Date.now();
    const windowStart = now - this.RATE_LIMIT_WINDOW;
    
    // Reset if window has passed
    if (record.firstAttempt < windowStart) {
      this.mobileRateLimits.delete(mobile);
      return { allowed: true };
    }
    
    if (record.count >= this.MOBILE_LIMIT) {
      const waitTime = Math.ceil((record.firstAttempt + this.RATE_LIMIT_WINDOW - now) / 1000);
      const waitTimeMinutes = Math.ceil(waitTime / 60);
      return { 
        allowed: false, 
        message: `Too many OTP requests. Please try again in ${waitTimeMinutes} minute${waitTimeMinutes > 1 ? 's' : ''}.`,
        waitTime
      };
    }
    
    return { allowed: true };
  }
  
  // Record mobile attempt
  recordMobileAttempt(mobile: string): void {
    const record = this.mobileRateLimits.get(mobile);
    const now = Date.now();
    
    if (!record) {
      this.mobileRateLimits.set(mobile, {
        count: 1,
        firstAttempt: now,
        lastAttempt: now
      });
    } else {
      record.count += 1;
      record.lastAttempt = now;
      this.mobileRateLimits.set(mobile, record);
    }
  }
  
  // Reset mobile rate limit (for testing)
  resetMobileRateLimit(mobile: string): void {
    this.mobileRateLimits.delete(mobile);
  }
  
  // Reset resend store (for testing)
  resetResendStore(mobile: string): void {
    this.resendStore.delete(mobile);
  }
  
  // Clear all data (for testing)
  clearAll(): void {
    this.mobileRateLimits.clear();
    this.otpStore.clear();
    this.resendStore.clear();
  }
  
  // Get rate limit status for mobile
  getMobileRateLimitStatus(mobile: string): {
    remaining: number;
    resetTime?: number;
  } {
    const record = this.mobileRateLimits.get(mobile);
    
    if (!record) {
      return { remaining: this.MOBILE_LIMIT };
    }
    
    const now = Date.now();
    const windowStart = now - this.RATE_LIMIT_WINDOW;
    
    if (record.firstAttempt < windowStart) {
      this.mobileRateLimits.delete(mobile);
      return { remaining: this.MOBILE_LIMIT };
    }
    
    const remaining = Math.max(0, this.MOBILE_LIMIT - record.count);
    const resetTime = record.firstAttempt + this.RATE_LIMIT_WINDOW;
    
    return { remaining, resetTime };
  }
  
  // Check if OTP is expired
  isOTPExpired(mobile: string): boolean {
    const record = this.otpStore.get(mobile);
    
    if (!record) {
      return true;
    }
    
    return Date.now() > record.expiresAt;
  }
  
  // Delete OTP
  deleteOTP(mobile: string): void {
    this.otpStore.delete(mobile);
  }
}

export const securityService = new SecurityService();