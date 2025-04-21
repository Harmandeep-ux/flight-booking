import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Update login state
    navigate('/signup'); // Redirect to signup/login
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            {/* Background image layer (non-clickable) */}
            <div
              className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center rounded-lg opacity-30 pointer-events-none"
              style={{ backgroundImage: 'url("https://www.example.com/plane.jpg")' }}
            ></div>

            {/* Modal content (above bg) */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={cancelLogout}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className='w-full bg-gradient-to-r from-blue-600 to-sky-500 h-20 flex items-center justify-between px-10 shadow-lg sticky top-0 z-40'>
        <Link to='/' className='flex items-center space-x-2 group'>
          <span className='text-3xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300'>
            Let's Fly
          </span>
          <span className='text-3xl animate-bounce'>✈️</span>
        </Link>

        <div className='hidden md:flex items-center space-x-8'>
          <Link to='/' className='text-xl text-white hover:text-yellow-300 px-3 py-1 rounded-lg hover:bg-white/10'>
            Home
          </Link>
          <Link to='/flights' className='text-xl text-white hover:text-yellow-300 px-3 py-1 rounded-lg hover:bg-white/10'>
            Flights
          </Link>
          {token && (
            <Link to='/bookings' className='text-xl text-white hover:text-yellow-300 px-3 py-1 rounded-lg hover:bg-white/10'>
              My Bookings
            </Link>
          )}
        </div>

        <div className='flex items-center space-x-4'>
          {token ? (
            <button
              onClick={confirmLogout}
              className='flex items-center space-x-2 bg-white text-blue-600 font-bold px-5 py-2 rounded-full hover:bg-yellow-100 hover:text-red-600 transition-all duration-300 shadow-md'
            >
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link to='/login' className='text-white hover:text-yellow-300 px-4 py-2 rounded-lg hover:bg-white/10'>
                Login
              </Link>
              <Link to='/register' className='bg-white text-blue-600 font-bold px-5 py-2 rounded-full hover:bg-blue-50'>
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
