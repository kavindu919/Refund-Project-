import prisma from "../lib/prismaClient.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, image, productId } = req.body;

    const product = await prisma.product.create({
      data: { name, price, description, image, productId },
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
};
