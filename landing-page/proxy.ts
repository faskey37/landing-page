// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  const origin = request.headers.get('origin') || '';
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // ========================================
  // 1. CONTENT SECURITY POLICY (CSP)
  // ========================================
  const cspDirectives = [
    `default-src 'self'`,
    
    // Scripts
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://apis.google.com`,
    
    // Styles
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    
    // Images - ADDED careerlauncher.com and careerlauncher.in
    `img-src 'self' data: blob: https://clsite-file1.s3.amazonaws.com https://*.careerlauncher.com https://careerlauncher.com https://*.careerlauncher.in https://*.googleapis.com https://*.gstatic.com https://*.ggpht.com`,
    
    // Fonts
    `font-src 'self' https://fonts.gstatic.com`,
    
    // Frames
    `frame-src 'self' https://www.google.com https://*.google.com`,
    
    // Connect/API calls
    `connect-src 'self' https://api.msg91.com https://script.google.com https://*.googleapis.com https://*.gstatic.com`,
    
    `media-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `block-all-mixed-content`,
    `upgrade-insecure-requests`,
  ];
  
  if (isDevelopment) {
    cspDirectives.push(`connect-src 'self' ws://localhost:* https://*.googleapis.com https://script.google.com`);
  }
  
  const cspHeader = cspDirectives.join('; ');
  
  // Remove duplicate CSP headers (fix for the "Ignoring duplicate" warning)
  response.headers.delete('Content-Security-Policy');
  response.headers.set('Content-Security-Policy', cspHeader);
  
  // ========================================
  // 2. OTHER SECURITY HEADERS
  // ========================================
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self), payment=(), usb=()'
  );
  
  if (!isDevelopment) {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }
  
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

// ========================================
// 4. CONFIGURATION
// ========================================
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp).*)',
  ],
};