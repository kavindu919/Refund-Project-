import React from "react";
import AddProductForm from "../components/Addproduct";
import Sidebar from "../components/Sidebar";

export default function AddProductPage() {
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="w-full h-full overflow-auto p-4">
            <AddProductForm />
          </div>
        </div>
      </div>
    </div>
  );
}
