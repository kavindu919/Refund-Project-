import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";

export default function ProductListPage() {
  return (
    <div>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="w-full h-full overflow-auto p-4">
            {/* Display Product List */}
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
}
