import React, { useState } from 'react';
import axios from 'axios';



export default function Signin() {
    const [user, setuser] = useState({
        email: "",
        password: "",
    })
    const handleChange = (event)=>{
        event.preventDefault();
        setuser({...user, [event.target.name]: event.target.value})
    }
const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user)

}

  return (
    <>
    <div className='w-100 h-100 flex bg-blue-900 m-4 rounded-2xl '>
        <div className='ml-4 mt-4 flex center text-white  flex-col mb-2 '>
            <h1 className='text-3xl text-white font-bold  self-center'>Sign In</h1>
        
        
        <label htmlFor="password">Email</label>
        <input   type="text" name="email"  value={user.email} onChange={handleChange} className='w-80 h-12 ml-2 bg-zinc-100 text-black rounded-md'/>
        <label htmlFor="password">password</label>
        <input   type="text" name='password' value={user.password} onChange={handleChange} className='w-80 h-12 ml-2 bg-zinc-100 text-black rounded-md'/>
        <button onClick={handleSubmit} className='w-20 h-10 bg-blue-500 rounded-md mt-6 hover:bg-blue-300 '>Signin</button>
        </div>
    </div>
    </>
  )
}
