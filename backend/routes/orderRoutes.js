import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// POST /api/orders (User) & GET /api/orders (Admin)
router.route('/')
  .post(protect, addOrderItems) // Create new order (Protected)
  .get(protect, admin, getOrders); // Get all orders (Admin Protected)

// GET /api/orders/myorders (User)
router.route('/myorders').get(protect, getMyOrders);

// GET/PUT/UPDATE /api/orders/:id
router.route('/:id')
  .get(protect, getOrderById); // Get single order (Protected)

// PUT /api/orders/:id/pay (User)
router.route('/:id/pay').put(protect, updateOrderToPaid);

// PUT /api/orders/:id/deliver (Admin)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;