// app/api/cron/send-scheduled-otp/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase-admin';

export async function GET() {
  try {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Only run between 9 AM and 9 PM
    if (currentHour < 9 || currentHour >= 21) {
      return NextResponse.json({ message: 'Not in DLT window' });
    }
    
    // Get pending scheduled OTPs
    const pendingOtps = await db.collection('scheduled_otps')
      .where('status', '==', 'pending')
      .where('scheduledFor', '<=', now)
      .get();
    
    const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
    const MSG91_TEMPLATE_ID = process.env.MSG91_OTP_TEMPLATE_ID;
    
    let sentCount = 0;
    
    for (const doc of pendingOtps.docs) {
      const data = doc.data();
      
      try {
        // Send SMS
        const response = await fetch('https://api.msg91.com/api/v5/otp', {
          method: 'POST',
          headers: {
            'authkey': MSG91_AUTH_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mobile: `91${data.mobile}`,
            template_id: MSG91_TEMPLATE_ID,
            otp: data.otp,
            otp_expiry: 10,
            otp_length: 6
          })
        });
        
        const result = await response.json();
        
        if (result.type === 'success') {
          await doc.ref.update({ 
            status: 'sent', 
            sentAt: new Date() 
          });
          sentCount++;
          console.log(`✅ Scheduled OTP sent to ${data.mobile}`);
        }
      } catch (error) {
        console.error(`Failed to send scheduled OTP to ${data.mobile}:`, error);
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      sent: sentCount,
      total: pendingOtps.size
    });
    
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}