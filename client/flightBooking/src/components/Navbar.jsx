import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../Admin/AdminLayout';
import AdminRoutes from '../Admin/AdminRoutes';

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Update login state
    navigate('/signup'); // Redirect to signup/login page
  };

  return (
    <>
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
            onClick={handleLogout}
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
