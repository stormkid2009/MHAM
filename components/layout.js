import React from 'react';
import Head from 'next/head';
import Navbar from './navbar';
import Footer from './footer';
import 'tailwindcss/tailwind.css';

function Layout({children}) {
  return (
    <div className="flex flex-col h-screen justify-between ">
      <Navbar />
      <Head>
        <title>MHAM FOR REALSTATE</title>
      </Head>
      <main >{children}</main>
      <Footer />
    </div>
  )
}

export default Layout