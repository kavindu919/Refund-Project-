import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Refundtable from "../components/Refundtable.jsx";

const Refund = () => {
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="w-full h-full overflow-auto p-4">
            <Refundtable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;
