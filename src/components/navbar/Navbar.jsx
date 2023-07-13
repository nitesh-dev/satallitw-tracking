import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
      <div class="container">
        <Link class="navbar-brand" href="/">
          Satellite Tracking
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
