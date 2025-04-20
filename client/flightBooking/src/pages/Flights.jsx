import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchFlights from '../components/SearchFlights';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookedFlights, setBookedFlights] = useState({}); // key = flight._id, value = true/false
  const [selectedFlight, setSelectedFlight] = useState(null); // Store the selected flight for details view

  const fetchAllFlights = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/allFlights');
      setFlights(res.data.flights);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFlights();
  }, []);

  const bookingHandler = async (flightId) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert("Please login to book a flight.");
      return;
    }
  
    const today = new Date().toISOString();
  
    try {
      const res = await axios.post(
        "http://localhost:3000/booking/book",
        {
          flight: flightId,
          bookingDate: today,
          seatsBooked: 1,
        },
        {
          headers: {
            token: token, // ✅ your backend expects this
          },
        }
      );
  
      alert(res.data.msg);
  
      setBookedFlights((prev) => ({
        ...prev,
        [flightId]: true,
      }));
    } catch (error) {
      console.error("Booking failed:", error);
      alert(error.response?.data?.msg || "Booking failed");
    }
  };

  const cancelingHandler = (id) => {
    const updated = { ...bookedFlights };
    delete updated[id];
    setBookedFlights(updated);
  };

  const handleViewDetails = (flight) => {
    setSelectedFlight(flight); // Set the selected flight details in state
  };

  const closeModal = () => {
    setSelectedFlight(null); // Close the modal when clicked
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">✈️ Explore Available Flights</h1>
      
      <SearchFlights />

      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-gray-500 animate-pulse">Fetching the best flights for you...</p>
        </div>
      ) : flights.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {flights.map((flight) => (
            <div
              key={flight._id}
              className="bg-white border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={flight.imageUrl}
                alt={flight.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-blue-800 mb-1">{flight.name}</h2>
                <p className="text-gray-600 mb-1"><span className="font-semibold">From:</span> {flight.origin}</p>
                <p className="text-gray-600 mb-1"><span className="font-semibold">To:</span> {flight.destination}</p>
                <p className="text-gray-600 mb-1"><span className="font-semibold">Date:</span> {flight.date}</p>
                <p className="text-gray-600 mb-1"><span className="font-semibold">Time:</span> {flight.departureTime} - {flight.arrivalTime}</p>
                <p className="text-gray-600 mb-3"><span className="font-semibold">Class:</span> {flight.classType} | <span className="font-semibold">Price:</span> ₹{flight.price}</p>
                
                <div className="flex justify-between mt-4">
                  <button 
                    onClick={() => handleViewDetails(flight)} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                  {bookedFlights[flight._id] && 
                    <button 
                      onClick={() => cancelingHandler(flight._id)} 
                      className="bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-700 transition1"
                    >
                      Cancel Booking
                    </button>
                  }
                  <button
                    onClick={() => bookingHandler(flight._id)}
                    className={`px-4 py-2 rounded-md transition ${
                      bookedFlights[flight._id]
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                    disabled={bookedFlights[flight._id]}
                  >
                    {bookedFlights[flight._id] ? "Booked" : "Book Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No flights available at the moment.</p>
      )}

      {/* View Details Modal */}
      {selectedFlight && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl font-semibold text-gray-600">&times;</button>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">{selectedFlight.name} - Details</h2>
            <p><strong>From:</strong> {selectedFlight.origin}</p>
            <p><strong>To:</strong> {selectedFlight.destination}</p>
            <p><strong>Date:</strong> {selectedFlight.date}</p>
            <p><strong>Time:</strong> {selectedFlight.departureTime} - {selectedFlight.arrivalTime}</p>
            <p><strong>Class:</strong> {selectedFlight.classType}</p>
            <p><strong>Price:</strong> ₹{selectedFlight.price}</p>
            <p><strong>Description:</strong> {selectedFlight.description || 'No description available.'}</p>
            <p><strong>Duration:</strong> {selectedFlight.duration}</p>
            <p><strong>Available Seats:</strong> {selectedFlight.availableSeats}</p>
            <div className="mt-4 flex justify-between">
              <button 
                onClick={() => bookingHandler(selectedFlight._id)} 
                className={`px-4 py-2 rounded-md transition ${
                  bookedFlights[selectedFlight._id]
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
                disabled={bookedFlights[selectedFlight._id]}
              >
                {bookedFlights[selectedFlight._id] ? "Booked" : "Book Now"}
              </button>
              <button 
                onClick={closeModal} 
                className="px-4 py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flights;