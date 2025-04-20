import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        headers: { token },
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
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    const token = localStorage.getItem('token');

    try {
      const res = await axios.delete(`http://localhost:3000/user/cancelBooking/${bookingId}`, {
        headers: { token },
      });

      alert(res.data.msg || "Booking canceled successfully!");
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Cancel booking failed:", error);
      alert("Cancel booking failed. Please try again.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">✈️ Your Flight Bookings</h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            {loading
              ? 'Loading your travel plans...'
              : bookings.length > 0
              ? 'All your upcoming adventures'
              : 'No bookings yet. Ready for your next journey?'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : bookings.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 border"
              >
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <img
                    src={
                      booking.flight.imageUrl ||
                      'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={booking.flight.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold">{booking.flight.name}</h2>
                    <p className="text-sm">
                      {booking.flight.origin} → {booking.flight.destination}
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Travel Date</p>
                      <p className="font-semibold">{formatDate(booking.flight.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-blue-600 font-bold text-xl">₹{booking.flight.price}</p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Departure</p>
                      <p>{formatTime(booking.flight.departureTime)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Arrival</p>
                      <p>{formatTime(booking.flight.arrivalTime)}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-500">Class: <span className="font-medium">{booking.flight.classType}</span></p>
                    <p className="text-sm text-gray-500">Seats Booked: <span className="font-medium">{booking.seatsBooked}</span></p>
                    <p className="text-sm text-gray-500">Booked On: <span className="font-medium">{formatDate(booking.bookingDate)}</span></p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-lg"
                    >
                      Cancel
                    </button>
                    <Link
                      to={`/ticket/${booking._id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center"
                    >
                      View Ticket
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-900">No bookings found</h3>
            <p className="mt-2 text-gray-500">You haven’t booked any flights yet.</p>
            <Link
              to="/flights"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Book Your Flight
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetBookings;
