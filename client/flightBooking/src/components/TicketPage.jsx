import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlaneDeparture } from 'react-icons/fa'; // Different plane icon

const TicketPage = () => {
  const { bookingid } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTicket = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get(`http://localhost:3000/booking/ticket/${bookingid}`, {
        headers: { token },
      });
      setTicket(res.data.booking);
    } catch (err) {
      console.error("Error fetching ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [bookingid]);

  if (loading) return <p className="text-center mt-10 text-lg text-gray-500">Loading ticket...</p>;
  if (!ticket) return <p className="text-center mt-10 text-red-500">Ticket not found.</p>;

  const { flight, bookingDate, seatsBooked, _id, status, user } = ticket;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 transform transition-transform hover:scale-105">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-extrabold text-blue-900">
            <FaPlaneDeparture className="inline-block mr-2 text-yellow-400" /> Flight Ticket
          </h2>
          <div className="text-sm text-gray-500">
            <p>Booking ID: {_id}</p>
            <p>{new Date(bookingDate).toLocaleString()}</p>
          </div>
        </div>

        {/* Ticket Info */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-700">Flight:</h3>
              <p>{flight.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-700">Status:</h3>
              <p className={`font-bold ${status === "Booked" ? "text-green-500" : "text-red-500"}`}>{status}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-700">From:</h3>
              <p>{flight.origin} → {flight.destination}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-700">Class:</h3>
              <p>{flight.classType}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-700">Date:</h3>
              <p>{new Date(flight.departureTime).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-700">Time:</h3>
              <p>{new Date(flight.departureTime).toLocaleTimeString()} - {new Date(flight.arrivalTime).toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-700">Seats Booked:</h3>
              <p>{seatsBooked}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-700">Price:</h3>
              <p>₹{flight.price}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-700">Customer:</h3>
            <p>{user.username} ({user.email})</p>
          </div>
        </div>

        {/* Go Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-yellow-500 text-white rounded-full text-lg font-bold shadow-lg transform transition-transform hover:bg-yellow-600"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
