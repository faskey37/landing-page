import { NextRequest, NextResponse } from 'next/server';

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY!;
  
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secretKey}&response=${token}`
  });
  
  const data = await response.json();
  return data.success === true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recaptchaToken, formData } = body;
    
    // Validate reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'Security verification failed' },
        { status: 400 }
      );
    }
    
    const isValid = await verifyRecaptcha(recaptchaToken);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Security verification failed' },
        { status: 403 }
      );
    }
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.mobile || !formData.program) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Send to Google Sheets
    const sheetsResponse = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        program: formData.program
      })
    });
    
    const sheetsResult = await sheetsResponse.json();
    
    if (!sheetsResponse.ok || !sheetsResult.success) {
      console.error('Google Sheets error:', sheetsResult);
      throw new Error('Failed to save to Google Sheets');
    }
    
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully!'
    });
    
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}