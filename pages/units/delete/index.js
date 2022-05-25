import React from 'react';
import {useRouter} from 'next/router'

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
    <div>
        <form onSubmit={submitHandler}>
            <input 
            type="text"
            name="unitCode"
            id="unitCode"
            required
            />
            <button
            type='submit'
            >Delete</button>
        </form>
    </div>
  )
}

export default DeleteUnit