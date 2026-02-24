import express from "express";
import {
  getMonthlyCalendar,
  getDateDetails
} from "../controllers/calendarController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get full month calendar data
router.get("/monthly", authMiddleware, getMonthlyCalendar);

// Get specific date details
router.get("/date", authMiddleware, getDateDetails);

export default router;