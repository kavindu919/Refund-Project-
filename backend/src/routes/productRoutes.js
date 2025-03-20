import express from "express";
import { addProduct, getAllProducts } from "../controllers/productController.js";

const router = express.Router();

// Route for adding a product
router.post("/addproduct", addProduct);

// Route for fetching all products
router.get("/getallproducts", getAllProducts);

export default router;