import { useState, useEffect } from "react";
import axios from "axios";

const PriceCalculationTable = () => {
  const [prices, setPrices] = useState({
    allProductPrice: 0,
    damageProductPrice: 0,
    refundPrice: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products/finance")
      .then((response) => {
        const { allProductPrice, damageProductPrice, refundPrice } =
          response.data;
        setPrices({ allProductPrice, damageProductPrice, refundPrice });
      })
      .catch((error) => console.error("Error fetching prices:", error));
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full h-auto mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Price Calculation Summary
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Total Product Price</th>
              <th className="py-3 px-6 text-left">Damage Product Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
              <td className="py-3 px-6">{prices.allProductPrice.toFixed(2)}</td>
              <td className="py-3 px-6">
                {prices.damageProductPrice.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceCalculationTable;
