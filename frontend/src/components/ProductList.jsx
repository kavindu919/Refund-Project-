import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <h2 className="text-xl font-semibold mb-4">Product List</h2>

      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id} className="mb-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p>{product.description}</p>
                <p className="text-gray-500">Price: ${product.price}</p>
                <p className="text-gray-500">Product ID: {product.productId}</p>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover mt-2"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
