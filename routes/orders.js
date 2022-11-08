import express from 'express';
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getUserOrders,
  getOrdersCount,
  getOrdersEarnings,
} from '../controllers/order.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/:id', verifyUser, createOrder);

router.put('/:id', verifyAdmin, updateOrder);

router.delete('/:id', verifyAdmin, deleteOrder);

router.get('/', verifyAdmin, getAllOrders);

router.get('/ordersCount', verifyAdmin, getOrdersCount);

router.get('/ordersEarnings', verifyAdmin, getOrdersEarnings);

router.get('/:id', verifyUser, getUserOrders);

router.get('/find/:id', verifyUser, getOrder);

export default router;
