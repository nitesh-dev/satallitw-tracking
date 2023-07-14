import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container">
        <Link className="navbar-brand" href="/">
          Satellite Tracking
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
