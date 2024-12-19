import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <h1>Temple Management</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/admin/login">Admin Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
