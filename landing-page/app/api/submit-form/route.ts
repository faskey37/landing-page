// app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server';

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('[reCAPTCHA] Missing secret key');
    return { success: false };
  }
  
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`
    });
    
    const data = await response.json();
    
    // Log score for monitoring (optional: store in database)
    console.log(`[reCAPTCHA] Score: ${data.score}, Success: ${data.success}`);
    
    // For v3, consider rejecting scores below 0.5
    return { 
      success: data.success === true,
      score: data.score 
    };
    
  } catch (error) {
    console.error('[reCAPTCHA] Verification error:', error);
    return { success: false };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recaptchaToken, formData } = body;
    
    // Validate reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'Security verification required. Please refresh and try again.' },
        { status: 400 }
      );
    }
    
    const verification = await verifyRecaptcha(recaptchaToken);
    
    if (!verification.success) {
      return NextResponse.json(
        { error: 'Security verification failed. Please refresh the page and try again.' },
        { status: 403 }
      );
    }
    
    // Optional: Reject low scores (bots)
    if (verification.score !== undefined && verification.score < 0.5) {
      console.warn(`[reCAPTCHA] Low score detected: ${verification.score}`);
      // Still accept, but you could return 403 here for strict bot blocking
    }
    
    // Validate required fields
    const { name, email, mobile, program } = formData;
    
    if (!name?.trim() || name.trim().length < 2) {
      return NextResponse.json({ error: 'Valid name is required' }, { status: 400 });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email?.trim() || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }
    
    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json({ error: 'Valid 10-digit mobile number is required' }, { status: 400 });
    }
    
    if (!program) {
      return NextResponse.json({ error: 'Program selection is required' }, { status: 400 });
    }
    
    // Send to Google Sheets
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    
    if (sheetsWebhookUrl) {
      const sheetsResponse = await fetch(sheetsWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name: name.trim(),
          email: email.trim().toLowerCase(),
          mobile: mobile,
          program: program,
          recaptchaScore: verification.score
        })
      });
      
      if (!sheetsResponse.ok) {
        console.error('[Google Sheets] Failed to save:', await sheetsResponse.text());
        // Don't fail the request - still return success to user
      }
    } else {
      console.warn('[Google Sheets] No webhook URL configured');
    }
    
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully!'
    });
    
  } catch (error) {
    console.error('[API] Submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}