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
    
    // Get OTP data from Firestore
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
    
    // OTP Verified - Prepare data for Google Sheets
    const sheetData = {
      name: otpData.name || '',
      email: otpData.email || '',
      mobile: otpData.mobile,
      program: otpData.program || '',
      verified: true,
      verified_at: new Date().toISOString()
    };
    
    console.log('📊 Saving to Google Sheets:', sheetData);
    
    // Save to Google Sheets
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    
    if (GOOGLE_SCRIPT_URL) {
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sheetData)
        });
        
        const result = await response.json();
        console.log('Google Sheets Response:', result);
        
        if (result.success) {
          console.log('✅ Data saved to Google Sheets');
        } else {
          console.error('Google Sheets error:', result.message);
        }
      } catch (sheetError) {
        console.error('Google Sheets fetch error:', sheetError);
      }
    } else {
      console.warn('⚠️ GOOGLE_SCRIPT_URL not configured');
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
    
    console.log('✅ OTP verified successfully');
    
    return NextResponse.json({ 
      success: true, 
      message: 'OTP verified successfully!' 
    });
    
  } catch (error) {
    console.error('❌ Verification error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Verification failed: ' + error.message
    });
  }
}