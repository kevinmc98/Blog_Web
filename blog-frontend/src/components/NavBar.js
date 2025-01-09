import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the CSS for NavBar

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/create" className="nav-link">Create Post</Link>
      {/* Add more links as needed */}
    </nav>
  );
};

export default NavBar;
