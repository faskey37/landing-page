// app/api/test-sms/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
  const MSG91_TEMPLATE_ID = process.env.MSG91_OTP_TEMPLATE_ID;
  
  console.log('=== TESTING MSG91 ===');
  console.log('Auth Key exists:', !!MSG91_AUTH_KEY);
  console.log('Template ID:', MSG91_TEMPLATE_ID);
  
  if (!MSG91_AUTH_KEY) {
    return NextResponse.json({ 
      success: false, 
      error: 'MSG91_AUTH_KEY not found in .env.local',
      message: 'Please add MSG91_AUTH_KEY to your .env.local file'
    });
  }
  
  // Test with a dummy number (replace with your number for testing)
  const testMobile = '919999999999'; // Change this to your number
  
  try {
    const response = await fetch('https://api.msg91.com/api/v5/otp', {
      method: 'POST',
      headers: {
        'authkey': MSG91_AUTH_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile: testMobile,
        otp: '123456',
        otp_expiry: 10,
        otp_length: 6
      })
    });
    
    const data = await response.json();
    console.log('MSG91 Response:', data);
    
    return NextResponse.json({ 
      success: data.type === 'success',
      response: data,
      authKeyUsed: MSG91_AUTH_KEY ? 'Present' : 'Missing'
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    });
  }
}