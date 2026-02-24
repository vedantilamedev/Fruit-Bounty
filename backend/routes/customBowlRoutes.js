import express from "express";
import { createCustomBowl, getMyCustomBowls } from "../controllers/customBowlController.js";
import { protect } from "../middleware/authMiddleware.js"; // use protect

const router = express.Router();

// Create a custom bowl
router.post("/", protect, createCustomBowl);

// Get all custom bowls for logged-in customer
router.get("/", protect, getMyCustomBowls);

export default router;