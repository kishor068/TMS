import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-white min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-orange-600">Admin Dashboard</h1>
        <div className="space-y-4">
          <ul className="space-y-4">
          <li>
              <Link
                to="/admin/manage/deity"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-md block text-center transition-colors"
              >
                Add Deity
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage/master-sevas"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-md block text-center transition-colors"
              >
                Manage Master Sevas
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage/special-sevas"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-md block text-center transition-colors"
              >
                Manage Special Sevas
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage/sub-sevas"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-md block text-center transition-colors"
              >
                Manage Sub-Sevas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
