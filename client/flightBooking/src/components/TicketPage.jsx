import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TicketPage = () => {
  const { bookingid } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTicket = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get(`http://localhost:3000/user/ticket/${bookingid}`, {
        headers: { token },
      });
      setTicket(res.data.ticket);
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

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white border-2 border-dashed rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">🎫 Flight Ticket</h2>

        <div className="space-y-2 text-gray-700">
          <p><strong>Flight:</strong> {ticket.flight.name}</p>
          <p><strong>From:</strong> {ticket.flight.origin} <strong>→</strong> {ticket.flight.destination}</p>
          <p><strong>Date:</strong> {ticket.flight.date}</p>
          <p><strong>Time:</strong> {ticket.flight.departureTime} - {ticket.flight.arrivalTime}</p>
          <p><strong>Class:</strong> {ticket.flight.classType}</p>
          <p><strong>Price:</strong> ₹{ticket.flight.price}</p>
          <p><strong>Seats Booked:</strong> {ticket.seatsBooked}</p>
          <p><strong>Booking ID:</strong> {ticket._id}</p>
          <p><strong>Booked on:</strong> {new Date(ticket.bookingDate).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
