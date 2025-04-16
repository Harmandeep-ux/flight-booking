import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Make sure this is imported
import FlightInspiration from './FlightInspiration';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 8000 }); // Initialize AOS with the duration of the animation
  }, []);

  return (
    <>
      <Navbar />

      <div className="relative w-full h-[600px]">
        {/* ✅ Background Image */}
        <img
          src="https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Flight"
          className="w-full h-full object-cover"
        />

        {/* ✅ Text over Image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4">
          {/* Apply AOS animation */}
          <h1 className="text-5xl font-bold mb-4 text-shadow-lg" data-aos="fade-up">
            ✈️ Find and Book Your Perfect Flight
          </h1>
          <p className="text-lg mb-6 max-w-[600px] mx-auto text-shadow-lg" data-aos="fade-up" data-aos-delay="200">
            Explore the skies with comfort and ease. Your journey starts here.
          </p>
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-full text-lg mt-4 hover:bg-yellow-300 transition" data-aos="fade-up" data-aos-delay="400">
            <Link to='/flights'>Search Flights</Link>
          </button>
        </div>
      </div>
   
    <FlightInspiration />
      <Footer />
    </>
  );
};

export default Home;
