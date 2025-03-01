import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimit = new Map();

export function rateLimiter(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const MAX_REQUESTS = 100;
  const WINDOW_MS = 900000; // 15 minutes

  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const requestData = rateLimit.get(ip) ?? [];
  const requestsInWindow = requestData.filter((timestamp:any) => timestamp > windowStart);

  if (requestsInWindow.length >= MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  requestData.push(now);
  rateLimit.set(ip, requestData);
  return NextResponse.next();
} 