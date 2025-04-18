import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Flights from './pages/Flights';
import Bookings from './pages/Bookings';
import Signin from './components/Signin';
import BookAFlight from './components/GetBookings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/flights' element={<Flights />} />
            <Route path='/bookings' element={<BookAFlight />} />
            {/* <Route path='/getbookings' element={<Bookings />} /> */}
          </Routes>
        </>
      ) : (
        <Signin />
      )}
    </div>
  );
}

export default App;
