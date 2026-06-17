// app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Initialize Google Sheets client
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { recaptchaToken, formData } = await request.json();

    // Verify reCAPTCHA token
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: 'POST' }
    );
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Extract data from form
    const { name, email, mobile, program, timestamp, userAgent, referrer, deviceDetails } = formData;

    // Prepare data for Google Sheets
    const rowData = [[
      name,
      email,
      mobile,
      program,
      timestamp || new Date().toISOString(),
      userAgent || 'Unknown',
      referrer || 'Direct',
      deviceDetails?.browserName || 'Unknown',
      deviceDetails?.browserVersion || 'Unknown',
      deviceDetails?.osName || 'Unknown',
      deviceDetails?.osVersion || 'Unknown',
      deviceDetails?.deviceType || 'Unknown',
      deviceDetails?.screenResolution || 'Unknown',
      deviceDetails?.language || 'Unknown',
      deviceDetails?.timezone || 'Unknown',
      deviceDetails?.platform || 'Unknown',
      deviceDetails?.cookiesEnabled?.toString() || 'Unknown',
      deviceDetails?.doNotTrack || 'Unknown',
      deviceDetails?.deviceMemory || 'Unknown',
      deviceDetails?.hardwareConcurrency || 'Unknown',
      deviceDetails?.ipAddress || 'Unknown',
      deviceDetails?.location?.city || 'Unknown',
      deviceDetails?.location?.region || 'Unknown',
      deviceDetails?.location?.country || 'Unknown',
      deviceDetails?.location?.timezone || 'Unknown',
    ]];

    // Append to Google Sheets
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = `${process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1'}!A:Z`;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: rowData },
    });

    // Send PDF email to user
    await sendPDFEmail({
      to: email,
      name: name,
      program: program,
      mobile: mobile,
      email: email
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully! Check your email for the information packet.' 
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Function to send email with PDF attachment
async function sendPDFEmail({ to, name, program, mobile, email }: { 
  to: string; 
  name: string; 
  program: string;
  mobile: string;
  email: string;
}) {
  try {
    // Read the PDF file from your public or assets folder
    // Option 1: PDF in public folder
    const pdfPath = path.join(process.cwd(), 'public', 'Career-Launcher-Information-Packet.pdf');
    
    // Option 2: PDF in assets folder
    // const pdfPath = path.join(process.cwd(), 'assets', 'Career-Launcher-Information-Packet.pdf');
    
    // Check if PDF exists
    if (!fs.existsSync(pdfPath)) {
      console.error('[PDF] File not found at:', pdfPath);
      // You can add a fallback PDF or skip attachment
      throw new Error('PDF file not found');
    }

    // Read the PDF file
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Email HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background-color: #e85222; padding: 20px; color: white; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .header p { margin: 5px 0 0; opacity: 0.9; }
            .content { padding: 30px; background: #f9f9f9; border-radius: 0 0 8px 8px; }
            .info-box { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #e85222; }
            .info-box strong { color: #e85222; }
            .button { display: inline-block; background: #e85222; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 10px 0; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎓 Career Launcher</h1>
            <p>Pune (Undri) - Comprehensive Coaching for Competitive Exams</p>
          </div>
          
          <div class="content">
            <h2 style="color: #e85222; margin-top: 0;">Welcome to Career Launcher, ${name}! 👋</h2>
            
            <p>Thank you for choosing Career Launcher for your preparation journey. We're committed to providing you with the best coaching experience.</p>
            
            <div class="info-box">
              <h4 style="color: #e85222; margin-top: 0;">📋 Your Registration Details</h4>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Mobile:</strong> ${mobile}</p>
              <p><strong>Selected Program:</strong> ${program}</p>
            </div>
            
            <h3 style="color: #e85222;">📌 What Happens Next?</h3>
            <ol>
              <li><strong>Counseling Session:</strong> Our academic advisors will reach out to you within 24 hours.</li>
              <li><strong>Program Orientation:</strong> We'll help you understand the best preparation strategy.</li>
              <li><strong>Demo Class:</strong> You're welcome to attend a demo class at our center.</li>
            </ol>
            
            <p style="font-size: 14px; color: #666; margin-top: 20px;">
              <strong>📎 Important:</strong> Please find attached the detailed information packet in PDF format. 
              This document contains comprehensive information about our programs, curriculum, and facilities.
            </p>
            
            <div style="background: #fff3e6; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p style="margin: 0; font-size: 13px;">
                <strong>💡 Did you know?</strong> Our students have consistently achieved top ranks in CAT, CLAT, and IPMAT exams.
                Start your preparation today!
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0;">
                <strong>Career Launcher Pune (Undri)</strong><br>
                [Your Address]<br>
                Phone: [Your Phone] | Email: [Your Email]
              </p>
              <p style="margin-top: 10px; color: #999;">
                This is an automated email. Please do not reply to this message. 
                For any queries, contact our support team.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email with PDF attachment
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: to,
      subject: '🎓 Welcome to Career Launcher - Information Packet',
      html: htmlContent,
      attachments: [
        {
          filename: 'Career-Launcher-Information-Packet.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log(`[Email] PDF sent to ${to}`);

    // Also send a copy to admin
    if (process.env.ADMIN_EMAIL) {
      const adminMailOptions = {
        from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `📝 New Form Submission - ${name}`,
        html: `
          <h2>New Form Submission Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Program:</strong> ${program}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        `,
        attachments: [
          {
            filename: `Submission-${name}-${Date.now()}.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ],
      };
      
      await transporter.sendMail(adminMailOptions);
      console.log(`[Email] Admin copy sent to ${process.env.ADMIN_EMAIL}`);
    }

    return true;
  } catch (error) {
    console.error('[Email] Failed to send PDF:', error);
    // Don't throw error - we don't want form submission to fail if email fails
    return false;
  }
}