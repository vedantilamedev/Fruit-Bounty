import express from "express";
import {
  adminLogin,
  adminRegister,
  getDashboardStats
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

//  Add these
router.post("/login", adminLogin);
router.post("/register", adminRegister);

// Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboardStats
);

export default router;