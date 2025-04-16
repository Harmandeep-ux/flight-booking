import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const Home = () => {
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
          {/* Adding a shadow for better contrast */}
          <h1 className="text-5xl font-bold mb-4 text-shadow-lg ">
            ✈️ Find and Book Your Perfect Flight
          </h1>
          <p className="text-lg mb-6 max-w-[600px] mx-auto text-shadow-lg">
            Explore the skies with comfort and ease. Your journey starts here.
          </p>
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-full text-lg mt-4 hover:bg-yellow-300 transition">
            <Link to='/flights'>Search Flights</Link> 
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
