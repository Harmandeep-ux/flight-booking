import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='w-full bg-sky-700 h-20 flex items-center justify-center p-5'>
      {/* Logo */}
      <div className='text-3xl font-bold text-white absolute left-10'>
        Let's Fly 🛫
      </div>
      
      {/* Centered Links */}
      <div className='flex gap-10'>
        <Link className='text-2xl text-white hover:text-yellow-300' to='/'>Home</Link>
        <Link className='text-2xl text-white hover:text-yellow-300' to='/flights'>Flights</Link>
        <Link className='text-2xl text-white hover:text-yellow-300' to='/bookings'>Bookings</Link>
      <button className='rounded-lg px-3 py-2 cursor-pointer bg-red-300 font-extrabold hover:bg-amber-100 hover:text-amber-700'>Logout</button>
      </div>
    </div>
  );
};


export default Navbar;




