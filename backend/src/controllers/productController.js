import prisma from "../lib/prismaClient.js";

export const addProduct = async (req, res) => {
  try {
    const { name, actualPrice, price, description, image, productId } =
      req.body;

    const product = await prisma.product.create({
      data: {
        name,
        actualPrice: parseFloat(actualPrice), // Ensure correct type
        price: parseFloat(price), // Selling Price
        description,
        image,
        productId,
      },
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const calculatePrices = async (req, res) => {
  try {
    const claims = await prisma.damageClaim.findMany({
      include: {
        product: true,
      },
    });

    const allProducts = await prisma.product.findMany();

    const allProductPrice = allProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );

    const damageProductPrice = claims.reduce((sum, claim) => {
      return sum + (claim.product?.price || 0);
    }, 0);

    const refundPrice = claims.reduce((sum, claim) => {
      if (claim.status === "approved" || claim.status === "refunded") {
        return sum + (claim.product?.price || 0);
      }
      return sum;
    }, 0);

    res.json({
      allProductPrice,
      damageProductPrice,
      refundPrice,
    });
  } catch (error) {
    console.error("Error calculating prices:", error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating prices." });
  }
};

export const calculateNetProfit = async (productId) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      actualPrice: true,
      price: true, // Selling Price
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const refund = await prisma.damageClaim.aggregate({
    where: { productId },
    _sum: { refundAmount: true }, // Assuming refundAmount exists in DamageClaim
  });

  const refundAmount = refund._sum.refundAmount || 0;
  const netProfit = product.price - product.actualPrice - refundAmount;

  return { netProfit };
};
