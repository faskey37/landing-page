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
        message: 'Mobile and OTP are required.',
      });
    }

    // ============================
    // GET OTP DATA
    // ============================
    const otpData = await otpStore.get(mobile);

    if (!otpData) {
      return NextResponse.json({
        success: false,
        message: 'No OTP found. Please request a new OTP.',
      });
    }

    // ============================
    // CHECK EXPIRY
    // ============================
    const now = new Date();
    const expiresAt = new Date(otpData.expiresAt);

    if (now > expiresAt) {
      await otpStore.delete(mobile);
      return NextResponse.json({
        success: false,
        message: 'OTP has expired. Please request a new OTP.',
      });
    }

    // ============================
    // CHECK ATTEMPTS
    // ============================
    if (otpData.attempts >= 3) {
      await otpStore.delete(mobile);
      return NextResponse.json({
        success: false,
        message: 'Too many failed attempts. Please request a new OTP.',
      });
    }

    // ============================
    // VERIFY OTP
    // ============================
    const isValid = await otpStore.verify(mobile, otp);

    if (!isValid) {
      await otpStore.incrementAttempts(mobile);
      const remainingAttempts = 2 - otpData.attempts;

      return NextResponse.json({
        success: false,
        message: `Invalid OTP. ${remainingAttempts} attempt(s) remaining.`,
      });
    }

    // ============================
    // PREPARE USER DATA
    // ============================
    const userData = {
      action: "verify", // for Apps Script logic
      name: otpData.name || '',
      email: otpData.email || '',
      mobile: otpData.mobile,
      program: otpData.program || '',
      status: "VERIFIED", // 🔥 important
      verified: true,
      verified_at: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    };

    console.log('📊 Sending to Google Sheets:', userData);

    // ============================
    // GOOGLE SHEETS INTEGRATION
    // ============================
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    if (GOOGLE_SCRIPT_URL) {
      let success = false;

      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          const text = await response.text();
          console.log('📊 Sheets Response:', text);

          if (!response.ok) {
            throw new Error(`Sheets API error: ${response.status}`);
          }

          console.log('✅ Google Sheets updated successfully');
          success = true;
          break;
        } catch (error) {
          console.error(`❌ Sheets attempt ${attempt + 1} failed:`, error);
          if (attempt === 1) {
            console.error('❌ All attempts failed');
          }
        }
      }
    } else {
      console.warn('⚠️ GOOGLE_SCRIPT_URL not configured');
    }

    // ============================
    // SAVE TO FIREBASE USERS
    // ============================
    try {
      await db.collection('users').doc(mobile).set(
        {
          name: otpData.name,
          email: otpData.email,
          mobile: otpData.mobile,
          program: otpData.program,
          status: "VERIFIED",
          verified: true,
          verified_at: new Date(),
          created_at: new Date(),
        },
        { merge: true }
      );

      console.log('✅ User saved to Firebase');
    } catch (userError) {
      console.error('❌ Firebase save error:', userError);
    }

    // ============================
    // CLEANUP OTP
    // ============================
    await otpStore.delete(mobile);

    console.log(`✅ OTP verified successfully for: ${mobile}`);

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully! Your information has been saved.',
      user: {
        name: otpData.name,
        email: otpData.email,
        mobile: otpData.mobile,
        program: otpData.program,
      },
    });

  } catch (error) {
    console.error('❌ Verification error:', error);

    const errorMessage =
      error && typeof error === 'object' && 'message' in error
        ? String(error.message)
        : 'Unknown error occurred';

    return NextResponse.json({
      success: false,
      message: 'Verification failed: ' + errorMessage,
    });
  }
}