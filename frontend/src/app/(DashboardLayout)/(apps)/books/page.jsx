
// pages/index.js
'use client';
import Head from 'next/head';
import useAuth from '@/app/hooks/useAuth';
import ListOfBooks from '../../components/apps/books/ListOfBooks';
export default function Page() {
  useAuth();
  return (
    <div>
      <ListOfBooks />
    </div>
  );
}
