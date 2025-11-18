import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// GET /api/products (Public) & POST /api/products (Admin)
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct); // Requires authentication AND admin role

// GET /api/products/:id (Public)
// PUT /api/products/:id (Admin)
// DELETE /api/products/:id (Admin)
router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct) // Requires authentication AND admin role
  .delete(protect, admin, deleteProduct); // Requires authentication AND admin role

export default router;