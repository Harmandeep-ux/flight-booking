import React from 'react'
import Signin from '../user/UserSignin'
import { Routes , Route, Link } from 'react-router-dom'


const Main = () => {
  return (
    
    <div>
      <h1>user</h1>

        <Routes>
        <Route path="/usersignin" element={<Signin />} />
    
        </Routes>

<Signin />
        <Link className='w-22 h-16 py-3 px-3 mt-4 ml-4 text-1xl font-bold rounded-lg bg-blue-500' to="/adminsignin"> Admin</Link>
    </div>
  )
}

export default Main