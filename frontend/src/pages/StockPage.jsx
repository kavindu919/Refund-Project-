import React from "react";
import Stock from "../components/Stock";
import Sidebar from "../components/Sidebar";

export default function Finance() {
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="w-full h-full overflow-auto p-4">
            <Stock />
          </div>
        </div>
      </div>
    </div>
  );
}
