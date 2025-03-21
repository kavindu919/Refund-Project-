import { useState, useEffect } from "react";
import axios from "axios";

const NetProfitTable = () => {
  const [netProfits, setNetProfits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products/netprofit")
      .then((response) => {
        setNetProfits(response.data.netProfits); // Set net profit data from API response
      })
      .catch((error) => console.error("Error fetching net profits:", error));
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full h-auto mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Net Profit Calculation Summary
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">Net Profit</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {netProfits.map((item) => (
              <tr
                key={item.productId}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-6">{item.productName}</td>
                <td className="py-3 px-6">
                  {item.netProfit.toFixed(2)}{" "}
                  {/* Format net profit to 2 decimal places */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NetProfitTable;
