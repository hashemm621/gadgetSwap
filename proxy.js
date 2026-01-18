import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname } = request.nextUrl;
  
  const session = request.cookies.get('user_session')?.value;

  if (pathname.startsWith('/add-item')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/items', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/add-item','/add-item/:path*', '/login'],
};