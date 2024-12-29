// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="mb-2">© 2024 Your Company. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
