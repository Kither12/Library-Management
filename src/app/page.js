'use client'

import * as React from 'react';
import { redirect } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
//   const { user, error, isLoading } = useUser();
//   if(isLoading || error) return <></>;
//   if(user){
// 	  redirect('/admin');
//   }
//   else{
//     redirect('/api/auth/login');
//   }
    redirect('/login');
}
