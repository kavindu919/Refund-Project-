import { useState } from "react";

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    productId: "",
  });

  const handleChange = () => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    e.preventDefault();

    try {
      const response = await fetch("/api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={productData.price}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium">
          Image URL
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={productData.image}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="productId" className="block text-sm font-medium">
          Product ID
        </label>
        <input
          type="text"
          id="productId"
          name="productId"
          value={productData.productId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
