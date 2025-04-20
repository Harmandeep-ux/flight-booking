import React, { useState } from 'react'
import axios from 'axios'
import { PlaneTakeoff, PlaneLanding, Search, DollarSign } from 'lucide-react'

const SearchFlights = () => {
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    classType: '',
    price: '',
    name: ''
  })

  const [flights, setFlights] = useState([])
  const [searched, setSearched] = useState(false) // 👈 NEW: To track if search has been triggered

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams(filters).toString()
      const response = await axios.get(`http://localhost:3000/flights/searchFlights?${query}`)
      setFlights(response.data.flight)
      setSearched(true) // ✅ Mark that a search has happened
    } catch (err) {
      console.error('Error fetching flights', err)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">✈️ Search Flights</h2>

      {/* Search Filters */}
      <div className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <input
          type="text"
          name="origin"
          value={filters.origin}
          onChange={handleChange}
          placeholder="Origin"
          className="input-style"
        />
        <input
          type="text"
          name="destination"
          value={filters.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="input-style"
        />
        <input
          type="text"
          name="classType"
          value={filters.classType}
          onChange={handleChange}
          placeholder="Class Type (e.g., Economy)"
          className="input-style"
        />
        <input
          type="text"
          name="price"
          value={filters.price}
          onChange={handleChange}
          placeholder="Max Price"
          className="input-style"
        />
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="Flight Name"
          className="input-style"
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
        >
          <Search size={18} /> Search
        </button>
      </div>

      {/* Flight Results */}
      <div className="mt-10">
        {flights.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {flights.map((flight) => (
              <div key={flight._id} className="bg-white rounded-xl shadow-md p-5 border">
                <h3 className="text-xl font-bold mb-2 text-blue-800">{flight.name}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><PlaneTakeoff className="inline w-4 h-4 mr-1" /> <strong>From:</strong> {flight.origin}</p>
                  <p><PlaneLanding className="inline w-4 h-4 mr-1" /> <strong>To:</strong> {flight.destination}</p>
                  <p><strong>Departure:</strong> {flight.departureTime}</p>
                  <p><strong>Arrival:</strong> {flight.arrivalTime}</p>
                  <p><strong>Class:</strong> {flight.classType}</p>
                  <p><DollarSign className="inline w-4 h-4 mr-1" /> <strong>Price:</strong> ₹{flight.price}</p>
                  <p><strong>Status:</strong> <span className={`font-semibold ${flight.status === 'On Time' ? 'text-green-600' : 'text-red-600'}`}>{flight.status}</span></p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          searched && (
            <p className="text-center text-gray-500 text-lg">No flights found. Try adjusting your filters.</p>
          )
        )}
      </div>
    </div>
  )
}

export default SearchFlights
