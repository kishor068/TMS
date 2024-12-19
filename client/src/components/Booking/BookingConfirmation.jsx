import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingConfirmation = ({ devoteeDetails, poojaDetails, totalAmount }) => {
  const navigate = useNavigate();
  const printRef = useRef();

  // Example Dummy Data if props aren't passed
  const defaultDevoteeDetails = {
    name: 'John Doe',
    mobile: '9876543210',
    performanceDate: '2024-06-20',
    address: '123 Temple Street, Pune, Maharashtra, 411001',
  };

  const defaultPoojaDetails = [
    { poojaName: 'Ganesh Pooja', qty: 1, amount: 500 },
    { poojaName: 'Navagraha Pooja', qty: 2, amount: 700 },
    { poojaName: 'Sudarshana Homa', qty: 1, amount: 1500 },
  ];

  const defaultTotalAmount = 2700;

  const devotee = devoteeDetails || defaultDevoteeDetails;
  const poojas = poojaDetails || defaultPoojaDetails;
  const total = totalAmount || defaultTotalAmount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white print:bg-white">
    

      {/* Main Content */}
      <main className="p-6 print:p-0">
        <div
          ref={printRef}
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none"
        >
          {/* Order Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-4 print:bg-white print:text-black">
            <h1 className="text-3xl font-bold">Order Confirmation</h1>
          </div>

          {/* Devotee Details */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Devotee Details</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <p>
                <span className="font-bold">Devotee Name:</span> {devotee.name}
              </p>
              <p>
                <span className="font-bold">Mobile:</span> {devotee.mobile}
              </p>
              <p>
                <span className="font-bold">Performance Date:</span> {devotee.performanceDate}
              </p>
              <p>
                <span className="font-bold">Address:</span> {devotee.address}
              </p>
            </div>
          </div>

          {/* Pooja Booked Details */}
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pooja Booked Details</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-orange-100 print:bg-gray-100">
                  <th className="py-2 px-4 text-left text-gray-700 font-semibold">Pooja Name</th>
                  <th className="py-2 px-4 text-center text-gray-700 font-semibold">Qty</th>
                  <th className="py-2 px-4 text-right text-gray-700 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {poojas.map((pooja, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{pooja.poojaName}</td>
                    <td className="py-2 px-4 text-center">{pooja.qty}</td>
                    <td className="py-2 px-4 text-right">₹{pooja.amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td className="py-2 px-4 text-center font-semibold text-gray-700">Order Total</td>
                  <td className="py-2 px-4 text-right font-semibold text-gray-700">₹{total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Print-only footer */}
          <div className="hidden print:block border-t border-gray-200 p-6">
            <div className="flex justify-between items-start mt-8">
              <div className="text-sm text-gray-500">
                This is a computer-generated receipt.
                <br />
                No signature is required.
              </div>
              <div className="text-center">
                <div className="border-b border-black w-48 h-10 mb-2"></div>
                <div className="text-sm">Recipient's Signature</div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Screen Only */}
          <div className="p-6 flex justify-between items-center print:hidden">
            <button
              onClick={() => navigate(-1)}
              className="text-blue-500 hover:text-blue-700 flex items-center transition duration-300"
            >
              <span className="mr-2">←</span> Back
            </button>
            <div className="flex gap-4">
              <button
                onClick={handlePrint}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
              >
                Print / Download
              </button>
              <button
                onClick={() => navigate('/payment')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Proceed To Pay
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingConfirmation;