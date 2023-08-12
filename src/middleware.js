

import { NextResponse } from "next/server";


export function middleware(request){
   const path = request.nextUrl.pathname;
   console.log('the pathname is',path);
   const isPublicPath = path ==='/login' ||  path === '/signup' || path==='/verifyemail';
   const token =  request.cookies.get('token')?.value || '';
   console.log(token,isPublicPath);
   if(isPublicPath && token){
    return NextResponse.redirect(new URL('/',request.nextUrl))
   }

   if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl));
   }
}


export const config = {
    matcher : [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}