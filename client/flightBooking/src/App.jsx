import { useState } from 'react'
import Signin from '../src/components/Signin'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from '../src/pages/all/Main'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>

    <Route path="/adminsignin" element={<Signin />} />
    <Route path="/" element={<Main /> } />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
