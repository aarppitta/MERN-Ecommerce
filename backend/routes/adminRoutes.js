import express from "express";
import { getAdminStats, getRecentOrders, getTopProducts, getMonthlySales } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", getAdminStats);

router.get("/recent-orders", getRecentOrders);

router.get("/top-products", getTopProducts);

router.get("/monthly-sales", getMonthlySales);

export default router;