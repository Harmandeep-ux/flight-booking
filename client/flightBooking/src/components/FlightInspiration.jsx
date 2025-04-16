import React from 'react';

const FlightInspiration = () => {
  const destinations = [
    {
      name: "Paris",
      description: "The city of love and lights. A dream destination for travelers.",
      img: "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Bali",
      description: "Bali is an island paradise with stunning beaches and vibrant culture.",
      img: "https://images.pexels.com/photos/1544351/pexels-photo-1544351.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "New York",
      description: "The city that never sleeps, full of life, entertainment, and history.",
      img: "https://images.pexels.com/photos/771881/pexels-photo-771881.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Tokyo",
      description: "A fascinating blend of ancient tradition and futuristic technology.",
      img: "https://images.pexels.com/photos/1510595/pexels-photo-1510595.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <div className="w-full py-16 bg-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-sky-700">Flight Inspiration ✈️</h2>
        <p className="text-xl text-gray-600 mt-4">
          Discover beautiful destinations around the world. Let us inspire your next adventure.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            {/* Image with Text Overlay */}
            <img
              src={destination.img}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white p-4 text-center">
              <h3 className="text-3xl font-bold text-shadow-lg">{destination.name}</h3>
              <p className="mt-2 text-lg text-shadow-md">{destination.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightInspiration;
