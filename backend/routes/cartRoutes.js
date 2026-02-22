import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addItemToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../controllers/cartController.js";

const router = express.Router();

router.use(protect); // All routes need logged-in user

router.post("/add", addItemToCart);
router.get("/", getCart);
router.put("/:itemId", updateCartItem);
router.delete("/:itemId", removeCartItem);
router.delete("/", clearCart);

export default router;