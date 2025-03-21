import { useState } from "react";

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    productId: "",
  });

  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:4000/api/products/addproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        // Reset form fields
        setProductData({
          name: "",
          price: "",
          description: "",
          image: "",
          productId: "",
        });

        // Show success message
        setSubmitStatus({
          success: true,
          message: data.message || "Product added successfully!",
        });

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSubmitStatus({
            success: false,
            message: "",
          });
        }, 3000);
      } else {
        // Show error message
        setSubmitStatus({
          success: false,
          message: data.message || "Failed to add product.",
        });
      }
    } catch (error) {
      console.error("Error adding product", error);
      setSubmitStatus({
        success: false,
        message: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

      {/* Success or Error Message */}
      {submitStatus.message && (
        <div
          className={`mb-4 p-4 rounded-md ${
            submitStatus.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Product Name */}
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
          placeholder="Enter product name"
          required
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Price */}
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
          placeholder="Enter price (e.g., 19.99)"
          required
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          required
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Product ID */}
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
          placeholder="Enter product ID"
          required
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Image URL (Optional) */}
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium">
          Image URL (Optional)
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={productData.image}
          onChange={handleChange}
          placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
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
