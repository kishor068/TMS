import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageMasterSevas from './components/AdminPanel/ManageMasterSevas'; // Example component
import ManageSpecialSevas from './components/AdminPanel/ManageSpecialSevas'; // Example component
import ManageSubSevas from './components/AdminPanel/ManageSubSevas'; // Example component
import BookingLanding from './pages/BookingLanding';
import SevaBooking from './components/Booking/SevaBooking'; // Correctly import SevaBooking
import SubSevaSelection from './components/Booking/SubSevaSelection'; // Import SubSevaSelection
import DevoteeForm from './components/Booking/DevoteeForm'; // Import DevoteeForm
import BookingConfirmation from './components/Booking/BookingConfirmation'; // Import BookingConfirmation
import NotFound from './pages/NotFound';
import ManageDeity from './components/AdminPanel/ManageDeity';
import Number from './components/Booking/Number';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Define Routes */}
          <Route path="/" element={<BookingLanding />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage/deity" element={<ManageDeity />} />
          <Route path="/admin/manage/master-sevas" element={<ManageMasterSevas />} />
          <Route path="/admin/manage/special-sevas" element={<ManageSpecialSevas />} />
          <Route path="/admin/manage/sub-sevas" element={<ManageSubSevas />} />
          <Route path="/booking/form" element={<SevaBooking />} />
          
          {/* Booking Flow Routes */}
          <Route path="/booking/sevas" element={<SevaBooking />} />
          <Route path="/booking/phone" element={<Number/>} />
          <Route path="/booking/sub-sevas/:sevaId" element={<SubSevaSelection />} />
          <Route path="/booking/devotee-form" element={<DevoteeForm />} />
          <Route path="/booking/confirmation" element={<BookingConfirmation />} />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
