import React from 'react';
import {useRouter} from 'next/router';
import Layout from '../../../components/layout';

function DeleteUnit() {
    const router = useRouter();
    const submitHandler=async(event)=>{
        const data = {code:event.target.unitCode.value};
        const JSONdata = JSON.stringify(data);
        // Send the form data to our API and get a response.
    await fetch("/api/units/delete", {
        // Body of the request is the JSON data we created above.
        body: JSONdata,
  
        // Tell the server we're sending JSON.
        headers: {
          "Content-Type": "application/json",
        },
        // The method is POST because we are sending data.
        method: "DELETE",
      });
      
      router.push("/");
    }
  return (
    <Layout>

    <div className='flex justify-center '>
        <form onSubmit={submitHandler} className="p-2 border-2 border-sky-400 rounded-md">
            <input 
            type="text"
            name="unitCode"
            id="unitCode"
            placeholder='type valid unit code'
            required
            className='p-2 m-2'
            />
            <button
            type='submit'
            className='p-2 m-2 text-white bg-slate-500'
            >Delete</button>
        </form>
    </div>
    </Layout>
  )
}

export default DeleteUnit