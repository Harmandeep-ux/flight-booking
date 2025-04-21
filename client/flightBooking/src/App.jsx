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

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');  // Get the token from localStorage
    if (token) {
      setIsLoggedIn(true);  // User is logged in if the token exists
    }
  }, []); // The empty array means this effect runs only once when the component mounts

  return (
    <div>
      {/* Navbar is always shown */}
      <Navbar setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        {/* Public routes accessible without login */}
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flights />} />

        {/* Protected routes that require login */}
        <Route
          path="/bookings"
          element={isLoggedIn ? <BookAFlight /> : <Signin setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/ticket/:bookingid"
          element={isLoggedIn ? <TicketPage /> : <Signin setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Routes for Login and Sign Up */}
        <Route path="/login" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
