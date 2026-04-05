// lib/otp-store.ts
export interface OTPData {
  otp: string;
  expiresAt: number;
  attempts: number;
}

class OTPStore {
  private store: Map<string, OTPData> = new Map();
  
  set(mobile: string, data: OTPData) {
    this.store.set(mobile, data);
  }
  
  get(mobile: string): OTPData | undefined {
    return this.store.get(mobile);
  }
  
  delete(mobile: string) {
    this.store.delete(mobile);
  }
  
  has(mobile: string): boolean {
    return this.store.has(mobile);
  }
  
  clear() {
    this.store.clear();
  }
  
  // Clean up expired OTPs (run periodically)
  cleanup() {
    const now = Date.now();
    for (const [mobile, data] of this.store.entries()) {
      if (now > data.expiresAt) {
        this.store.delete(mobile);
      }
    }
  }
}

export const otpStore = new OTPStore();

// Run cleanup every hour
if (typeof setInterval !== 'undefined') {
  setInterval(() => otpStore.cleanup(), 60 * 60 * 1000);
}