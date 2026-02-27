import express from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import {protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get("/:id", getProduct);

router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;