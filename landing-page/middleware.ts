// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  const origin = request.headers.get('origin') || '';
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // ========================================
  // 1. SIMPLIFIED CSP FOR TESTING
  // ========================================
  const cspDirectives = [
    `default-src 'self'`,
    
    // Allow all scripts from anywhere (for testing - we'll tighten later)
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' * data: blob:`,
    
    // Allow all styles
    `style-src 'self' 'unsafe-inline' *`,
    
    // Allow all images
    `img-src 'self' data: blob: *`,
    
    // Allow all fonts
    `font-src 'self' *`,
    
    // CRITICAL for reCAPTCHA v2
    `frame-src 'self' https://www.google.com https://recaptcha.google.com https://www.recaptcha.net *`,
    
    // CRITICAL for reCAPTCHA API calls
    `connect-src 'self' * wss:`,
    
    `media-src 'self' *`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `block-all-mixed-content`,
    `upgrade-insecure-requests`,
  ];
  
  const cspHeader = cspDirectives.join('; ');
  
  // Remove any existing CSP headers first
  response.headers.delete('Content-Security-Policy');
  response.headers.set('Content-Security-Policy', cspHeader);
  
  // ========================================
  // 2. OTHER SECURITY HEADERS
  // ========================================
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // ========================================
  // 3. CORS HEADERS (for API routes)
  // ========================================
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const allowedOrigins = [
      'https://www.careerlauncher.com',
      'https://careerlauncher.com',
      'https://www.careerlauncher.in',
      'https://careerlauncher.in',
      ...(isDevelopment ? ['http://localhost:3000', 'http://localhost:3001'] : [])
    ];
    
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
    
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: response.headers,
      });
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp).*)',
  ],
};