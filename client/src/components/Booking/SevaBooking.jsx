import React from 'react';
import { useNavigate } from 'react-router-dom';

const SevaBooking = () => {
  const navigate = useNavigate();

  const masterSevas = [
    { id: 1, name: 'Master Seva 1', description: 'Experience spiritual bliss.' },
    { id: 2, name: 'Master Seva 2', description: 'Seek divine blessings.' },
  ];
  const specialSevas = [
    { id: 3, name: 'Special Seva 1', description: 'Offer special prayers.' },
    { id: 4, name: 'Special Seva 2', description: 'Participate in grand rituals.' },
  ];

  const handleSevaClick = (sevaId) => {
    navigate(`/booking/sub-sevas/${sevaId}`);
  };

  return (
    <div className="seva-booking p-6 max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">Select Your Seva</h2>

      {/* Master Sevas Section */}
      <div className="seva-section mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Master Sevas</h3>
        <div className="seva-cards grid grid-cols-1 md:grid-cols-2 gap-6">
          {masterSevas.map((seva) => (
            <div
              key={seva.id}
              className="seva-card bg-white p-6 rounded-lg shadow-md hover:bg-orange-100 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
              onClick={() => handleSevaClick(seva.id)}
            >
              <h4 className="text-lg font-semibold text-gray-800">{seva.name}</h4>
              <p className="text-gray-600 mt-2">{seva.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Special Sevas Section */}
      <div className="seva-section mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Special Sevas</h3>
        <div className="seva-cards grid grid-cols-1 md:grid-cols-2 gap-6">
          {specialSevas.map((seva) => (
            <div
              key={seva.id}
              className="seva-card bg-white p-6 rounded-lg shadow-md hover:bg-orange-100 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
              onClick={() => handleSevaClick(seva.id)}
            >
              <h4 className="text-lg font-semibold text-gray-800">{seva.name}</h4>
              <p className="text-gray-600 mt-2">{seva.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <button
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors mt-4"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

    </div>
  );
};

export default SevaBooking;
