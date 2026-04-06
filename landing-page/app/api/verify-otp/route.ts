// app/api/verify-otp/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../lib/firebase-admin';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();
    
    console.log("🔍 Verifying OTP for:", email);
    
    // Get OTP record from Firebase
    const otpDoc = await db.collection('otps').doc(email).get();
    
    if (!otpDoc.exists) {
      return NextResponse.json({ 
        success: false, 
        message: "No OTP request found. Please request a new OTP." 
      });
    }
    
    const otpData = otpDoc.data();
    
    if (!otpData) {
      return NextResponse.json({ 
        success: false, 
        message: "OTP data is corrupted. Please request a new OTP." 
      });
    }
    
    // Check if expired
    if (new Date() > otpData.expiresAt.toDate()) {
      await db.collection('otps').doc(email).delete();
      return NextResponse.json({ 
        success: false, 
        message: "OTP has expired. Please request a new OTP." 
      });
    }
    
    // Check attempts (max 3)
    if (otpData.attempts >= 3) {
      await db.collection('otps').doc(email).delete();
      return NextResponse.json({ 
        success: false, 
        message: "Too many failed attempts. Please request a new OTP." 
      });
    }
    
    // Verify OTP (compare plain text with hashed)
    const isValid = await bcrypt.compare(otp, otpData.otpHash);
    
    if (!isValid) {
      // Increment failed attempts
      await db.collection('otps').doc(email).update({
        attempts: otpData.attempts + 1
      });
      
      const remainingAttempts = 2 - otpData.attempts;
      return NextResponse.json({ 
        success: false, 
        message: `Invalid OTP. ${remainingAttempts} attempt(s) remaining.` 
      });
    }
    
    // OTP verified - save to Google Sheets
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    
    if (GOOGLE_SCRIPT_URL) {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: otpData.name,
          email: otpData.email,
          mobile: otpData.mobile,
          program: otpData.program,
          verified: true,
          verified_at: new Date().toISOString(),
          timestamp: new Date().toISOString()
        }),
      });
    }
    
    // Delete used OTP from Firebase
    await db.collection('otps').doc(email).delete();
    
    console.log("✅ OTP verified successfully for:", email);
    
    return NextResponse.json({ 
      success: true, 
      message: "OTP verified successfully! Your counseling session request has been saved." 
    });
    
  } catch (error) {
    console.error("❌ Verification error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Verification failed. Please try again." 
    });
  }
}