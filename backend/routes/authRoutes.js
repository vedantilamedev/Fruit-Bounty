import express from "express";
import { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  resetPassword 
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

//  Register
router.post("/register", registerUser);

//  Login
router.post("/login", loginUser);

//  Forgot Password
router.post("/forgotpassword", forgotPassword);

//  Reset Password
router.put("/resetpassword/:token", resetPassword);

//  Protected Route
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

//  Admin Only Route
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;