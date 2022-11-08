import express from 'express';
import {
  updateUser,
  deleteUser,
  getUser,
  getUserData,
  getUsers,
  getUserCount,
} from '../controllers/user.js';
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.put('/:id', verifyUser, updateUser);

router.delete('/:id', verifyUser, deleteUser);

router.get('/', verifyAdmin, getUsers);

router.get('/userCount', verifyAdmin, getUserCount);

router.get('/data/:id', verifyUser, getUserData);
router.get('/:id', verifyUser, getUser);

export default router;
