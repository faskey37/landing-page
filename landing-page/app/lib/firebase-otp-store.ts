// lib/firebase-otp-store.ts
import { db, admin } from './firebase-admin';
import bcrypt from 'bcryptjs';

export interface OTPData {
  mobile: string;
  email: string;
  name: string;
  program: string;
  otpHash: string;
  attempts: number;
  expiresAt: Date;
}

export class FirebaseOTPStore {
  
  async save(mobile: string, data: OTPData): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
    // Store ALL fields including name, email, program
    const docData = {
      mobile: data.mobile,
      email: data.email,
      name: data.name,
      program: data.program,
      otpHash: data.otpHash,
      attempts: data.attempts,
      expiresAt: expiresAt,
      createdAt: new Date()
    };
    
    console.log('📝 Saving to Firestore:', docData);
    
    await db.collection('otps').doc(mobile).set(docData);
  }
  
  async get(mobile: string): Promise<OTPData | null> {
    const doc = await db.collection('otps').doc(mobile).get();
    if (!doc.exists) return null;
    const data = doc.data();
    console.log('📖 Retrieved from Firestore:', data);
    return {
      mobile: data?.mobile || '',
      email: data?.email || '',
      name: data?.name || '',
      program: data?.program || '',
      otpHash: data?.otpHash || '',
      attempts: data?.attempts || 0,
      expiresAt: data?.expiresAt?.toDate() || new Date()
    };
  }
  
  async delete(mobile: string): Promise<void> {
    await db.collection('otps').doc(mobile).delete();
  }
  
  async verify(mobile: string, userOtp: string): Promise<boolean> {
    const data = await this.get(mobile);
    if (!data) return false;
    return await bcrypt.compare(userOtp, data.otpHash);
  }
  
  async incrementAttempts(mobile: string): Promise<void> {
    await db.collection('otps').doc(mobile).update({
      attempts: admin.firestore.FieldValue.increment(1)
    });
  }
}

export const otpStore = new FirebaseOTPStore();