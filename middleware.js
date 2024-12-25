import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { rateLimit } from '@/lib/utils/rateLimit';

export async function middleware(request) {
  // Handle API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Apply rate limiting
    const limiterResponse = await rateLimit(request);
    if (limiterResponse) return limiterResponse;

    // Add CORS headers
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Log request
    logger.info('API Request', {
      method: request.method,
      path: request.nextUrl.pathname,
      userAgent: request.headers.get('user-agent'),
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};