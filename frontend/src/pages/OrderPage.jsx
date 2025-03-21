import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/products/getallproducts")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleRefund = (productId) => {
    navigate(`/claimpage?productId=${productId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Order Your Products
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left border">Product</th>
                <th className="py-3 px-6 text-left border">Price</th>
                <th className="py-3 px-6 text-center border">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-6">{product.name}</td>
                    <td className="py-3 px-6">${product.price}</td>
                    <td className="py-3 px-6 flex items-center justify-center gap-3">
                      <button
                        className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow"
                        onClick={() => handleRefund(product.id)}
                      >
                        Refund
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-3 px-6 border">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
