import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const BalanceSheet = () => {
  const [prices, setPrices] = useState({
    allProductPrice: 0,
    damageProductPrice: 0,
    productDetails: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products/finance")
      .then((response) => {
        const { allProductPrice, damageProductPrice, productDetails } =
          response.data;
        setPrices({
          allProductPrice,
          damageProductPrice,
          productDetails,
        });
      })
      .catch((error) => console.error("Error fetching prices:", error));
  }, []);

  const totalAssets = prices.allProductPrice + prices.damageProductPrice;
  const liabilities = 0;
  const equity = totalAssets - liabilities;

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Balance Sheet", 20, 20);
    doc.setFontSize(12);

    doc.text("Assets", 20, 30);
    doc.text(
      `Total Product Price: ${prices.allProductPrice.toFixed(2)}`,
      20,
      40
    );
    doc.text(
      `Total Damage Product Price: ${prices.damageProductPrice.toFixed(2)}`,
      20,
      50
    );
    doc.text(`Total Assets: ${totalAssets.toFixed(2)}`, 20, 60);

    doc.text("Liabilities", 20, 70);
    doc.text(`Liabilities: ${liabilities.toFixed(2)}`, 20, 80);

    doc.text("Equity", 20, 90);
    doc.text(`Total Equity: ${equity.toFixed(2)}`, 20, 100);

    doc.save("balance-sheet.pdf");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full h-auto mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Balance Sheet
      </h2>

      {/* Assets Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-600">Assets</h3>
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            <tr className="border-b border-gray-200">
              <td className="py-3 px-6">Total Product Price</td>
              <td className="py-3 px-6">{prices.allProductPrice.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-6">Total Damage Product Price</td>
              <td className="py-3 px-6">
                {prices.damageProductPrice.toFixed(2)}
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-6 font-semibold">Total Assets</td>
              <td className="py-3 px-6 font-semibold">
                {totalAssets.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Liabilities Section (if any) */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-600">Liabilities</h3>
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            <tr className="border-b border-gray-200">
              <td className="py-3 px-6">Liabilities</td>
              <td className="py-3 px-6">{liabilities.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Equity Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-600">Equity</h3>
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            <tr className="border-b border-gray-200">
              <td className="py-3 px-6 font-semibold">Total Equity</td>
              <td className="py-3 px-6 font-semibold">{equity.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Download Button */}
      <button
        onClick={generatePDF}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Download PDF
      </button>
    </div>
  );
};

export default BalanceSheet;
