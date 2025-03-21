import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col shadow-lg">
      <div className="p-5 text-2xl font-bold text-center bg-gray-800">
        Admin Dashboard
      </div>
      <ul className="mt-10 space-y-4">
        <li className="hover:bg-gray-700 p-3 rounded-md transition-all duration-200">
          <Link to="/refundtable" className="block">
            Refund
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-3 rounded-md transition-all duration-200">
          <Link to="/addproduct" className="block">
            Add Product
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-3 rounded-md transition-all duration-200">
          <Link to="/finance" className="block">
            Finance
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-3 rounded-md transition-all duration-200">
          <Link to="/balancesheet" className="block">
            Balance Sheet
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
