import React from 'react';
import Head from 'next/head';
import Navbar from './navbar';
import Footer from './footer';

function Layout({children}) {
  return (
    <>
      <Navbar />
      <Head>
        <title>MHAM FOR REALSTATE</title>
      </Head>
      <main >{children}</main>
      <Footer />
    </>
  )
}

export default Layout