import React, { useState } from 'react';
import axios from 'axios';

const BookAFlight = ({ flightId }) => {
  const [seatsBooked, setSeatsBooked] = useState(1);
  const [bookingDate, setBookingDate] = useState('');

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:3000/booking/book',
        {
          flight: flightId,
          seatsBooked,
          bookingDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.msg);
    } catch (err) {
      alert(err.response?.data?.msg || "Booking failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-4">🛫 Book This Flight</h1>

      <label className="block mb-2 font-semibold">Booking Date:</label>
      <input
        type="date"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <label className="block mb-2 font-semibold">Seats:</label>
      <input
        type="number"
        min="1"
        value={seatsBooked}
        onChange={(e) => setSeatsBooked(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <button
        onClick={handleBooking}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl w-full"
      >
        Book Now
      </button>
    </div>
  );
};

export default BookAFlight;
