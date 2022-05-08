import {useState} from 'react'
//import {connectToDatabase} from '../lib/mongodb'

const Form = ()=>{
    const [unit,setUnit] = useState({});
    const handler =(e)=>{
        e.preventDefault();
        setUnit({name:e.target.value});
    }
    const submit = async()=>{
         await fetch(`/api/units`,{
            method:"POST",
            body:JSON.stringify(unit)
        })
        setUnit({})
    }

    return(
        <div>
            <input type="text" value={unit.name} onChange={handler}/>
            <br />
            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default Form;