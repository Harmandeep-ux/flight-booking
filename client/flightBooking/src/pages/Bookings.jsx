import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/bookings", {
        withCredentials: true, // ⬅️ Important for cookies
      });

      if (res.data.bookings) {
        setBookings(res.data.bookings);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">✈️ Your Booked Flights</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map(({ flight, _id }) => (
            <div key={_id} className="bg-white rounded-2xl shadow-md overflow-hidden border">
              <img src={flight.imageUrl} alt={flight.name} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-blue-800">{flight.name}</h2>
                <p className="text-gray-600"><strong>From:</strong> {flight.origin}</p>
                <p className="text-gray-600"><strong>To:</strong> {flight.destination}</p>
                <p className="text-gray-600"><strong>Date:</strong> {flight.date}</p>
                <p className="text-gray-600"><strong>Time:</strong> {flight.departureTime} - {flight.arrivalTime}</p>
                <p className="text-gray-600"><strong>Class:</strong> {flight.classType} | <strong>Price:</strong> ₹{flight.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
