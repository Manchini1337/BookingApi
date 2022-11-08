import express from 'express';
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
  getHotelsCountByCity,
  getCountByType,
  getHotelRooms,
} from '../controllers/hotels.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyAdmin, createHotel);

router.put('/:id', verifyAdmin, updateHotel);

router.delete('/:id', verifyAdmin, deleteHotel);

router.get('/', getHotels);
router.get('/countByCity', getHotelsCountByCity);
router.get('/countByType', getCountByType);
router.get('/room/:id', getHotelRooms);
router.get('/find/:id', getHotel);

export default router;
