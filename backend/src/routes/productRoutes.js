import express from "express";
import {
  addProduct,
  calculatePrices,
  getAllProducts,
  calculateNetProfit,
  getStockDetails,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/addproduct", addProduct);
router.get("/getallproducts", getAllProducts);
router.get("/finance", calculatePrices);
router.get("/netprofit", calculateNetProfit);
router.get("/stocks", getStockDetails);

export default router;
