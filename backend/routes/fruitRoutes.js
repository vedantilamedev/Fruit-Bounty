import express from "express";
import {
  addFruit,
  getAllFruits,
  getSingleFruit,
  updateFruit,
  deleteFruit
} from "../controllers/fruitcontroller.js";

import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllFruits);
router.get("/:id", getSingleFruit);

// Admin only
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  addFruit
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  updateFruit
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteFruit
);

export default router;