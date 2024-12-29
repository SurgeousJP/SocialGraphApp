import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex">
      <nav className="w-64 bg-gray-800 h-screen p-5">
        <h2 className="text-white text-2xl mb-4">Admin Dashboard</h2>
        <ul>
          <li className="mb-2">
            <Link to="/admin/products" className="text-white hover:underline">
              Product List
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/products/add"
              className="text-white hover:underline"
            >
              Add Product
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex-1 p-5">
        <Outlet /> {/* Render child routes here */}
      </div>
    </div>
  );
};

export default AdminLayout;
