import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Flights from './pages/Flights';
import Signin from './components/Signin';
import BookAFlight from './components/GetBookings';
import TicketPage from './components/TicketPage';

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
            <Route path="/ticket/:bookingid" element={<TicketPage/>} /> {/* 👈 Ticket page */}
                        </Routes>
        </>
      ) : (
        <Signin />
      )}
    </div>
  );
}

export default App;
