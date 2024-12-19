import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubSevaSelection = ({ cart = [], setCart }) => {
  const [activeDeity, setActiveDeity] = useState('Shree Pradhana Devarige');
  const [date, setDate] = useState('');
  const [quantities, setQuantities] = useState({});
  const [selectedPoojas, setSelectedPoojas] = useState({});
  const [prasadDelivery, setPrasadDelivery] = useState('Personally');
  
  const poojaRates = {
    'Shree Pradhana Devarige': [
      { name: 'Brahmana Santharpane', rate: 50.00 },
      { name: 'Go Pooja', rate: 500.00 },
      { name: 'Panchambratha Abhisheka', rate: 30.00 },
    ],
    'Lord Shiva': [
      { name: 'Karthika Pooja', rate: 150.00 },
      { name: 'Pavamana Abhisheka', rate: 100.00 },
      { name: 'Trikaal Pooja', rate: 550.00 },
    ],
    'Lord Vishnu': [
      { name: 'Pushpalankara Pooja', rate: 1250.00 },
      { name: 'Go Pooja', rate: 500.00 },
      { name: 'Laksha Hoovina Pooja', rate: 1505.00 },
    ],
    'Goddess Lakshmi': [
      { name: 'Nanda Deepa', rate: 15.00 },
      { name: 'Brahmana Santharpane', rate: 50.00 },
      { name: 'Karthika Pooja', rate: 150.00 },
    ],
    'Lord Ganesha': [
      { name: 'Trikaal Pooja', rate: 550.00 },
      { name: 'Pushpalankara Pooja', rate: 1250.00 },
      { name: 'Pavamana Abhisheka', rate: 100.00 },
    ],
  };

  const deities = Object.keys(poojaRates);

  const handleQuantityChange = (poojaName, value) => {
    if (value > 0) {
      setSelectedPoojas(prev => ({
        ...prev,
        [poojaName]: true
      }));
    }
    setQuantities(prev => ({
      ...prev,
      [poojaName]: value,
    }));
  };

  const handleCheckboxChange = (poojaName, checked) => {
    setSelectedPoojas(prev => ({
      ...prev,
      [poojaName]: checked
    }));
    if (!checked) {
      setQuantities(prev => ({
        ...prev,
        [poojaName]: 0
      }));
    } else if (!quantities[poojaName]) {
      setQuantities(prev => ({
        ...prev,
        [poojaName]: 1
      }));
    }
  };

  const calculateAmount = (poojaName) => {
    const selectedPoojas = poojaRates[activeDeity];
    const pooja = selectedPoojas.find(pooja => pooja.name === poojaName);
    return pooja ? pooja.rate * (quantities[poojaName] || 0) : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ activeDeity, date, quantities, prasadDelivery });
  };

  return (
    <div className="sub-seva-selection p-6 max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">Pooja Booking</h2>

      <form onSubmit={handleSubmit}>
        {/* Deity Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex overflow-x-auto flex-wrap">
            {deities.map((deity) => (
              <button
                key={deity}
                type="button"
                onClick={() => setActiveDeity(deity)}
                className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors duration-200 ${
                  activeDeity === deity
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {deity}
              </button>
            ))}
          </div>
        </div>

        {/* Date Picker */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Pooja Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Pooja Booking Table */}
        <div className="overflow-x-auto mb-6">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Select</th>
                <th className="px-4 py-2 text-left">Pooja Name</th>
                <th className="px-4 py-2 text-left">Pooja Rate</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {poojaRates[activeDeity].map((pooja) => (
                <tr key={pooja.name} className="border-b">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedPoojas[pooja.name] || false}
                      onChange={(e) => handleCheckboxChange(pooja.name, e.target.checked)}
                      className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-4 py-2">{pooja.name}</td>
                  <td className="px-4 py-2">₹{pooja.rate.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={quantities[pooja.name] || 0}
                      onChange={(e) => handleQuantityChange(pooja.name, parseInt(e.target.value))}
                      className="w-20 px-2 py-1 border rounded-md"
                      min="0"
                      disabled={!selectedPoojas[pooja.name]}
                    />
                  </td>
                  <td className="px-4 py-2">₹{calculateAmount(pooja.name).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Prasad Delivery Mode */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Prasad Delivery Mode</label>
          <select
            value={prasadDelivery}
            onChange={(e) => setPrasadDelivery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="Personally">Personally</option>
            <option value="Postal">Postal</option>
          </select>
        </div>

        {/* Postal Note */}
        {prasadDelivery === 'Postal' && (
          <p className="text-red-500 mb-4">
            Additional ₹50 extra for postal charges.
          </p>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Back
          </button>
          <Link
            to="/booking/confirmation"
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-md text-center transition-colors"
          >
            Review
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SubSevaSelection;