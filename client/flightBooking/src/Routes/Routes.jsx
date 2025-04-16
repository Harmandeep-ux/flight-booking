import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../pages/Home'
import Bookings from '../pages/Bookings'
import Flights from '../pages/Flights'

const Routes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/bookings' element={<Bookings/>} />
        <Route path='/flights' element={<Flights/>} />
    </Routes>
    </>
  )
}

export default Routes