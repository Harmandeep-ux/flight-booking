import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Flights from './pages/Flights'
import Home from './components/Home'
import Bookings from './pages/Bookings'
function App() {

  return (
    <>
    <div>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/flights' element={<Flights/>}/>
        <Route path='/bookings' element={<Bookings/>}/>
      </Routes>
   
    </div>
    </>
  )
}                                                                                                                                  

export default App
