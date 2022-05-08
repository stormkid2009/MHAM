import React from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css'

function AccessDenied() {
  return (
    <div className='flex flex-col items-center'>
      <div>
        <Image src="/accessDenied.jpeg" alt='access denied pic' height={300} width={300} />
      </div>
      <div className='text-2xl m-4 p-2'>
        <h2>
        Kindly sign in to access this page
        </h2>
      </div>
      <div className={styles.btn}>
          <Link href="/api/auth/signin"
           onClick={(e) => {
           e.preventDefault()
           signIn()
        }}>
          <a >Sign In</a>
          </Link>
        
      </div>
    </div>
  )
}

export default AccessDenied;