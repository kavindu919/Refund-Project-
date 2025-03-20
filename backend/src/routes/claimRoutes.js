import express from "express";
import {
  getAllClaims,
  getUserClaims,
  submitClaim,
  updateClaimStatus,
} from "../controllers/claimController.js";
import upload from "../lib/multerConfig.js";
const router = express.Router();

router.post("/uploadimage", upload.single("image"), submitClaim);
router.get("/getallclaims", getAllClaims);
router.post("/:userId", updateClaimStatus);
router.get("/user/:userId", getUserClaims);

export default router;
