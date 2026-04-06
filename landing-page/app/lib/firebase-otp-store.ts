// lib/firebase-otp-store.ts
import { db, admin } from './firebase-admin';
import bcrypt from 'bcryptjs';

export interface OTPData {
  mobile: string;
  email: string;
  name: string;
  otpHash: string;
  attempts: number;
  expiresAt: Date;
}

export class FirebaseOTPStore {
  
  // Store OTP
  async save(mobile: string, data: OTPData): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
    await db.collection('otps').doc(mobile).set({
      ...data,
      expiresAt: expiresAt,
      expireAt: expiresAt, // For Firestore TTL
      createdAt: new Date()
    });
  }
  
  // Get OTP data
  async get(mobile: string): Promise<OTPData | null> {
    const doc = await db.collection('otps').doc(mobile).get();
    if (!doc.exists) return null;
    return doc.data() as OTPData;
  }
  
  // Delete OTP
  async delete(mobile: string): Promise<void> {
    await db.collection('otps').doc(mobile).delete();
  }
  
  // Verify OTP
  async verify(mobile: string, userOtp: string): Promise<boolean> {
    const data = await this.get(mobile);
    if (!data) return false;
    
    // Compare plain text OTP with hashed OTP
    return await bcrypt.compare(userOtp, data.otpHash);
  }
  
  // Increment failed attempts
  async incrementAttempts(mobile: string): Promise<void> {
    await db.collection('otps').doc(mobile).update({
      attempts: admin.firestore.FieldValue.increment(1)
    });
  }
}

export const otpStore = new FirebaseOTPStore();