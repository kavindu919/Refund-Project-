import prisma from "../lib/prismaClient.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      actualPrice,
      price,
      description,
      image,
      productId,
      stockQuantity,
    } = req.body;

    // Ensure stockQuantity is an integer
    const stockQty = parseInt(stockQuantity, 10);

    // Create a new product
    const product = await prisma.product.create({
      data: {
        name,
        actualPrice: parseFloat(actualPrice), // Ensure correct type
        price: parseFloat(price), // Selling Price
        description,
        image,
        productId,
        stockQuantity: stockQty, // Add stock quantity to the product
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

export const calculateNetProfit = async (req, res) => {
  try {
    // Get all products
    const products = await prisma.product.findMany({
      include: {
        DamageClaim: true,
      },
    });
    const netProfits = [];

    for (const product of products) {
      const refundAmount = product.DamageClaim.reduce((sum, claim) => {
        if (claim.status === "approved" || claim.status === "refunded") {
          return sum + (claim.product?.price || 0);
        }
        return sum;
      }, 0);
      const netProfit = product.price - product.actualPrice - refundAmount;

      netProfits.push({
        productId: product.id,
        productName: product.name,
        netProfit,
      });
    }
    res.json({ netProfits });
  } catch (error) {
    console.error("Error calculating net profit:", error);
    res.status(500).json({
      error: "An error occurred while calculating net profit for all products.",
    });
  }
};

export const getStockDetails = async (req, res) => {
  try {
    // Fetch all products with damage claims and their quantities (assuming you have a quantity field in Product model)
    const products = await prisma.product.findMany({
      include: {
        DamageClaim: true, // Include related damage claims to account for sold or claimed items
      },
    });

    // Initialize an array to hold stock details for each product
    const stockDetails = [];

    // Loop through each product to calculate stock data
    for (const product of products) {
      // Calculate the total claimed quantity (e.g., damage claims)
      const claimedQuantity = product.DamageClaim.reduce((sum, claim) => {
        if (claim.status === "approved" || claim.status === "refunded") {
          return sum + 1; // Assuming one claim corresponds to one unit of the product
        }
        return sum;
      }, 0);

      // Assuming you have a stockQuantity field in Product to represent total stock
      const stockAvailable = product.stockQuantity - claimedQuantity;

      // Add the result to the stockDetails array
      stockDetails.push({
        productId: product.id,
        productName: product.name,
        totalStock: product.stockQuantity,
        claimedStock: claimedQuantity,
        availableStock: stockAvailable,
      });
    }

    // Respond with the calculated stock details for all products
    res.json({ stockDetails });
  } catch (error) {
    console.error("Error fetching stock details:", error);
    res.status(500).json({
      error: "An error occurred while fetching stock details for all products.",
    });
  }
};
