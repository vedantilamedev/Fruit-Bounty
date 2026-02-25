import express from "express";
import { testWhatsApp } from "../controllers/whatsappController.js";

const router = express.Router();

// Public test route
router.post("/test", testWhatsApp);

export default router;