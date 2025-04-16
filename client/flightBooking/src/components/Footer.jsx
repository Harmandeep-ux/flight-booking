import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* Column 1: Logo or Brand Name */}
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-3xl font-bold mb-4">Let's Fly 🛫</h2>
          <p className="text-gray-400 text-center sm:text-left">Explore the skies with us! Your journey begins here.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center sm:items-center justify-center">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-center">
            <li><a href="#about" className="hover:text-yellow-400">About Us</a></li>
            <li><a href="#contact" className="hover:text-yellow-400">Contact</a></li>
            <li><a href="#terms" className="hover:text-yellow-400">Terms of Service</a></li>
            <li><a href="#privacy" className="hover:text-yellow-400">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3: Social Media & Contact */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
              <FaLinkedin size={24} />
            </a>
          </div>
          <p className="text-gray-400 text-sm">Email: contact@letsfly.com</p>
        </div>

      </div>

      <div className="bg-gray-800 py-4 text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Let's Fly. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
