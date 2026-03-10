import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-links">
        <Link to="/terms" rel="noopener noreferrer">
          Terms of Service
        </Link>
        <Link to="/disclaimer" rel="noopener noreferrer">
          Medical Disclaimer
        </Link>
        <Link to="/contact" rel="noopener noreferrer">
          Contact
        </Link>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} RxFluent</p>
    </footer>
  );
};

export default Footer;
