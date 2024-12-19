import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DevoteeForm = ({ onDevoteeSubmit }) => {
  const [devotee, setDevotee] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    mobile: '',
    country: 'India', // Default value
    state: '',
    city: '',
    addressLane1: '',
    addressLane2: '',
    pincode: ''
  });

  const [existingDevotee, setExistingDevotee] = useState(null);
  const [error, setError] = useState('');

  // Dummy data for select dropdowns (e.g., countries and states)
  const countries = ['India', 'USA', 'Canada'];
  const indianStates = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat'];

  // Simulate checking if a mobile number already exists (Frontend-only logic)
  useEffect(() => {
    if (devotee.mobile.length === 10) {
      const dummyDevotee = {
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        mobile: '1234567890',
        country: 'India',
        state: 'Maharashtra',
        city: 'Pune',
        addressLane1: '123 Temple Street',
        addressLane2: 'Near Garden',
        pincode: '411001'
      };
      if (devotee.mobile === dummyDevotee.mobile) {
        setExistingDevotee(dummyDevotee);
      } else {
        setExistingDevotee(null);
      }
    }
  }, [devotee.mobile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!devotee.firstName || !devotee.mobile) {
      setError('First Name and Mobile are required.');
      return;
    }

    // If existing devotee found, use existing data
    if (existingDevotee) {
      onDevoteeSubmit(existingDevotee);
    } else {
      onDevoteeSubmit(devotee);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">Devotee Details</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {existingDevotee && (
        <p className="text-blue-500 mb-4">
          Existing devotee found! Submit to continue with prefilled details.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              value={devotee.firstName}
              onChange={(e) => setDevotee({ ...devotee, firstName: e.target.value })}
              placeholder="Enter First Name"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number *
            </label>
            <input
              type="tel"
              value={devotee.mobile}
              onChange={(e) => setDevotee({ ...devotee, mobile: e.target.value })}
              placeholder="Enter Mobile Number"
              className="w-full px-4 py-2 border rounded-md"
              maxLength={10}
            />
          </div>
        </div>

        {/* Country Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            value={devotee.country}
            onChange={(e) => setDevotee({ ...devotee, country: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
        {devotee.country === 'India' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              value={devotee.state}
              onChange={(e) => setDevotee({ ...devotee, state: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select State</option>
              {indianStates.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Address and Other Details */}
        <input
          type="text"
          value={devotee.addressLane1}
          onChange={(e) => setDevotee({ ...devotee, addressLane1: e.target.value })}
          placeholder="Address Lane 1"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          value={devotee.city}
          onChange={(e) => setDevotee({ ...devotee, city: e.target.value })}
          placeholder="City"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          value={devotee.pincode}
          onChange={(e) => setDevotee({ ...devotee, pincode: e.target.value })}
          placeholder="Pincode"
          className="w-full px-4 py-2 border rounded-md"
        />

        <Link
            to="/booking/form"
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            Begin Seva Booking
          </Link>
      </form>
    </div>
  );
};

export default DevoteeForm;
