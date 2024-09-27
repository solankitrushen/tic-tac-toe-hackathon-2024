// pages/index.js
'use client';
import Head from 'next/head';
import useAuth from '@/app/hooks/useAuth';

export default function Page() {
  useAuth();
  return (
    <div>
      hello world
    </div>
  );
}
