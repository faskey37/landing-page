// app/api/verify-otp/route.ts
import { NextResponse } from 'next/server';
import { otpStore } from '@/app/lib/firebase-otp-store';
import { db } from '@/app/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { mobile, otp } = await request.json();
    
    console.log('=== VERIFY OTP ===');
    console.log('Mobile:', mobile);
    console.log('OTP:', otp);
    
    if (!mobile || !otp) {
      return NextResponse.json({ 
        success: false, 
        message: 'Mobile and OTP are required.' 
      });
    }
    
    // Get OTP data from Firebase
    const otpData = await otpStore.get(mobile);
    
    if (!otpData) {
      return NextResponse.json({ 
        success: false, 
        message: 'No OTP found. Please request a new OTP.' 
      });
    }
    
    // Check expiry
    const now = new Date();
    const expiresAt = new Date(otpData.expiresAt);
    
    if (now > expiresAt) {
      await otpStore.delete(mobile);
      return NextResponse.json({ 
        success: false, 
        message: 'OTP has expired. Please request a new OTP.' 
      });
    }
    
    // Check attempts
    if (otpData.attempts >= 3) {
      await otpStore.delete(mobile);
      return NextResponse.json({ 
        success: false, 
        message: 'Too many failed attempts. Please request a new OTP.' 
      });
    }
    
    // Verify OTP
    const isValid = await otpStore.verify(mobile, otp);
    
    if (!isValid) {
      await otpStore.incrementAttempts(mobile);
      const remainingAttempts = 2 - otpData.attempts;
      return NextResponse.json({ 
        success: false, 
        message: `Invalid OTP. ${remainingAttempts} attempt(s) remaining.` 
      });
    }
    
    // OTP Verified - Save to Google Sheets
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    
    if (GOOGLE_SCRIPT_URL) {
      try {
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
            verified_at: new Date().toISOString()
          })
        });
        console.log('✅ Data saved to Google Sheets');
      } catch (sheetError) {
        console.error('Google Sheets error:', sheetError);
      }
    }
    
    // Save to Firebase Users collection
    try {
      await db.collection('users').doc(mobile).set({
        name: otpData.name,
        email: otpData.email,
        mobile: otpData.mobile,
        program: otpData.program,
        verified: true,
        verified_at: new Date(),
        created_at: new Date()
      }, { merge: true });
      console.log('✅ User saved to Firebase');
    } catch (userError) {
      console.error('Firebase save error:', userError);
    }
    
    // Delete used OTP
    await otpStore.delete(mobile);
    
    console.log(`✅ OTP verified successfully for: ${mobile}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'OTP verified successfully!',
      user: {
        name: otpData.name,
        email: otpData.email,
        mobile: otpData.mobile,
        program: otpData.program
      }
    });
    
  } catch (error) {
    console.error('Verification error:', error);
    // Fix: Handle error safely without accessing error.message if undefined
    const errorMessage = error && typeof error === 'object' && 'message' in error 
      ? String(error.message) 
      : 'Unknown error occurred';
    return NextResponse.json({ 
      success: false, 
      message: 'Verification failed: ' + errorMessage
    });
  }
}