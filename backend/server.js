import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import claimRoutes from "./src/routes/claimRoutes.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 4000;
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  methods: "GET,POST,PUT,DELETE", // Allowed methods
  allowedHeaders: "Content-Type, Authorization", // Allowed headers
  credentials: true, // Allow cookies (if needed)
};
app.use(cors(corsOptions));

app.use(express.json());
// app.use(cors());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/products", productRoutes);
app.use("/api/claims", claimRoutes);

app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
