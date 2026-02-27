import express from "express";
import {
  createCheckoutSession,
  stripeWebhook
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout", protect, createCheckoutSession);

// Webhook route
router.post("/webhook", stripeWebhook);

export default router;