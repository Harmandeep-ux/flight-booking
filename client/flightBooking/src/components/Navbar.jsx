import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';



const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <div
              className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center rounded-lg opacity-30"
              style={{
                backgroundImage: 'url("https://www.example.com/plane.jpg")', // Use your plane image URL here
              }}
            ></div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 z-10">Confirm Logout</h3>
            <p className="text-gray-600 mb-6 z-10">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4 z-10">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className='w-full bg-gradient-to-r from-blue-600 to-sky-500 h-20 flex items-center justify-between px-10 shadow-lg sticky top-0 z-40'>
        {/* Logo */}
        <Link to='/' className='flex items-center space-x-2 group'>
          <span className='text-3xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300'>
            Let's Fly
          </span>
          <span className='text-3xl animate-bounce'>✈️</span>
        </Link>

        {/* Navigation Links */}
        <div className='hidden md:flex items-center space-x-8'>
          <Link
            to='/'
            className='text-xl text-white hover:text-yellow-300 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-white/10'
          >
            Home
          </Link>
          <Link
            to='/flights'
            className='text-xl text-white hover:text-yellow-300 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-white/10'
          >
            Flights
          </Link>
          {token && (
            <Link
              to='/bookings'
              className='text-xl text-white hover:text-yellow-300 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-white/10'
            >
              My Bookings
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className='flex items-center space-x-4'>
          {token ? (
            <button
              onClick={confirmLogout}
              className='flex items-center space-x-2 bg-white text-blue-600 font-bold px-5 py-2 rounded-full hover:bg-yellow-100 hover:text-red-600 transition-all duration-300 shadow-md'
            >
              <span>Logout</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          ) : (
            <>
              <Link
                to='/login'
                className='text-white hover:text-yellow-300 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='bg-white text-blue-600 font-bold px-5 py-2 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-md'
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
