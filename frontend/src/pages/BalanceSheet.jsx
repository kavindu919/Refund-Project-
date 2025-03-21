import React from "react";
import BalanceSheet from "../components/BalanceSheet";
import Sidebar from "../components/Sidebar";

export default function BalanceSheetPage() {
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="w-full h-full overflow-auto p-4">
            <BalanceSheet />
          </div>
        </div>
      </div>
    </div>
  );
}
