// pages/index.js
'use client';
import Head from 'next/head';
import useAuth from '@/app/hooks/useAuth';
import AddBookForm from '../../components/apps/books/AddBookForm';
export default function Page() {
  useAuth();
  return (
    <div>
      <AddBookForm />
    </div>
  );
}
