import prisma from "../lib/prismaClient.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, image, productId } = req.body;

    // Validate required fields
    if (!name || !price || !description || !productId) {
      return res.status(400).json({ message: "All fields are required except image." });
    }

    // Create the product in the database
    const product = await prisma.product.create({
      data: { name, price, description, image, productId },
    });

    // Send success response
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error in addProduct:", error); // Debugging
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getAllProducts:", error); // Debugging
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};