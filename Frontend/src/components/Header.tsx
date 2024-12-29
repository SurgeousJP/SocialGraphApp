// src/components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">The Con Dom</div>
        <nav className="space-x-4">
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Shop
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
