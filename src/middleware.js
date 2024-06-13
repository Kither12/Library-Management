import { NextResponse } from 'next/server';

export function middleware(request) {
	const currentUser = request.cookies.get('currentUser')?.value;

	if (!currentUser && request.nextUrl.pathname.startsWith('/admin')) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (!currentUser && request.nextUrl.pathname.startsWith('/user')) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

    if(currentUser == 'admin' && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/user'))){
        return NextResponse.redirect(new URL('/admin', request.url));
    }
    if(currentUser == 'user' && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/admin'))){
        return NextResponse.redirect(new URL('/user', request.url));
    }
}
