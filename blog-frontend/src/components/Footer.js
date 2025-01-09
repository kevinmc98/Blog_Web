import React from 'react';
import '../index.css'; // Assuming you have CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <p>Blog Application</p>
      <p>&copy; 2024 Mustkeem Ahmad. All rights reserved.</p>
      <p>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a> |
        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">Twitter</a>
      </p>
    </footer>
  );
};

export default Footer;
