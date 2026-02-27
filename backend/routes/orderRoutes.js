import express from 'express';
import {createOrder, getMyOrders, getOrder, getAllOrders, updateOrderStatus, deleteOrder } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrder);

router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id", protect, adminOnly, updateOrderStatus);
router.delete("/:id", protect, adminOnly, deleteOrder);

export default router;