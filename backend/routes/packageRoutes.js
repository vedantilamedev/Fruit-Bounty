import express from "express";
import {
  createPackage,
  getAllPackages,
  updatePackage,
  deletePackage
} from "../controllers/packageController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllPackages);

// Admin only
router.post("/", authMiddleware, roleMiddleware("admin"), createPackage);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updatePackage);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deletePackage);

export default router;