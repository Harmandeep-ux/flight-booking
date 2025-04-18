import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("Please login to view your bookings.");
      return;
    }

    try {
      const res = await axios.get('http://localhost:3000/user/bookings', {
        headers: {
          token: token,
        },
      });
      setBookings(res.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Error fetching bookings.");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.delete(`http://localhost:3000/user/cancelBooking/${bookingId}`, {
        headers: {
          token,
        },
      });

      alert(res.data.msg || "Booking canceled.");

      // Refresh the bookings list
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Cancel booking failed:", error);
      alert("Cancel booking failed.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">✈️ Your Bookings</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-gray-500 animate-pulse">Loading your bookings...</p>
        </div>
      ) : bookings.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={booking.flight.imageUrl}
                alt={booking.flight.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-blue-800 mb-1">{booking.flight.name}</h2>
                <p className="text-gray-600 mb-1"><span className="font-semibold">From:</span> {booking.flight.origin}</p>
                <p className="text-gray-600 mb-1"><span className="font-semibold">To:</span> {booking.flight.destination}</p>
                <p className="text-gray-600 mb-1"><span className="font-semibold">Date:</span> {booking.flight.date}</p>
                <p className="text-gray-600 mb-1"><span className="font-semibold">Time:</span> {booking.flight.departureTime} - {booking.flight.arrivalTime}</p>
                <p className="text-gray-600 mb-3"><span className="font-semibold">Class:</span> {booking.flight.classType} | <span className="font-semibold">Price:</span> ₹{booking.flight.price}</p>
                <p className="text-gray-600 mb-1"><span className="font-semibold">Booking Date:</span> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-4"><span className="font-semibold">Seats Booked:</span> {booking.seatsBooked}</p>

                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No bookings available.</p>
      )}
    </div>
  );
};

export default GetBookings;
