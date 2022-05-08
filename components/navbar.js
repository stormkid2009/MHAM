import React from 'react';
import  'tailwindcss/tailwind.css';
import styles from '../styles/Home.module.css'
import {useSession,signIn,signOut} from 'next-auth/react';
import {useRouter} from 'next/router';

function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignin=(e)=>{
    e.preventDefault();
    signIn();
    
  }

  const handleSignout=(e)=>{
    e.preventDefault();
    signOut();
    
    
  }
  const handleHome =(e)=>{
    e.preventDefault();
    router.push('/');
  }
  return (
    <div className="flex  justify-between bg-blue-700  h-16 text-center text-white
    py-2">
      <div>
      <button className={styles.btn} onClick={handleHome}>Home</button>
      </div>
      <div>
        {!session && <button className={styles.btn} onClick={handleSignin}>Sign in</button>}
        {session && <button className={styles.btn} onClick={handleSignout}>Sign Out</button> }
      </div>
      </div>
  )
}

export default Navbar