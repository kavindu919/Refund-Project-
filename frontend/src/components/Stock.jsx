import { useState, useEffect } from "react";
import axios from "axios";

const StockDetailsTable = () => {
  const [stockDetails, setStockDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products/stocks")
      .then((response) => {
        setStockDetails(response.data.stockDetails);
      })
      .catch((error) => console.error("Error fetching stock details:", error));
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full h-auto mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Stock Details Summary
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">Total Stock</th>
              <th className="py-3 px-6 text-left">Claimed Stock</th>
              <th className="py-3 px-6 text-left">Available Stock</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {stockDetails.map((item) => (
              <tr
                key={item.productId}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-6">{item.productName}</td>
                <td className="py-3 px-6">{item.totalStock}</td>
                <td className="py-3 px-6">{item.claimedStock}</td>
                <td className="py-3 px-6">{item.availableStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockDetailsTable;
