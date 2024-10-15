'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import { useSearchParams } from 'next/navigation';

function page() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name')||'';
  return (
    <>
      <Navbar/>
    </>
  )
}

export default page
