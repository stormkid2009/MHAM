import {useRef } from 'react';
import {signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';


const AuthForm =()=>{
    const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const session = getSession();
  const router = useRouter();

  

  async function submitHandler(event) {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    // optional: Add validation
    const result = await signIn('credentials', {
      redirect: false,
      username: enteredUsername,
      password: enteredPassword,
    });
    router.push('/');
    
  }

  return (
    <section className="">
      <h1>Login to Dashboard</h1>
      <form onSubmit={submitHandler}>
        <div className="">
          <label htmlFor='username'>User Name</label>
          <input type='text' id='username' required ref={usernameInputRef} />
        </div>
        <div className="">
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className="">
          <button type="submit">Login</button>
          
        </div>
      </form>
    </section>
  );
}

export default AuthForm;