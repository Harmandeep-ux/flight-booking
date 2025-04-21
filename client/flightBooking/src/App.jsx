import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Flights from './pages/Flights';
import Signin from './components/Signin';
import BookAFlight from './components/GetBookings';
import TicketPage from './components/TicketPage';
import AdminRoutes from './admin/AdminRoutes'; // ✅ Import

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <div>
      <Navbar setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flights />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />

        {/* Protected Routes */}
        <Route
          path="/bookings"
          element={isLoggedIn ? <BookAFlight /> : <Signin setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/ticket/:bookingid"
          element={isLoggedIn ? <TicketPage /> : <Signin setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* ✅ Admin Panel Route */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
