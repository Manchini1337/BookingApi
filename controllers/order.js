import Order from '../models/Order.js';
import Hotel from '../models/Hotel.js';
import User from '../models/User.js';

export const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('Order deleted');
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    const hotel = await Hotel.findById(order.product);
    const user = await User.findById(order.customer);
    const updatedOrder = { ...order._doc, product: hotel, customer: user };

    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const list = await Promise.all(
      orders.map(async (order) => {
        const hotel = await Hotel.findById(order.product);
        const user = await User.findById(order.customer);
        return { ...order._doc, customer: user, product: hotel };
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const getOrdersCount = async (req, res, next) => {
  try {
    const orders = await Order.find({
      createdAt: {
        $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      },
    }).sort({ createdAt: -1 });
    res.status(200).json(orders.length);
  } catch (err) {
    next(err);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .where('customer')
      .equals(req.params.id)
      .limit(5)
      .sort({ createdAt: -1 });
    const user = await User.findById(req.params.id);
    const list = await Promise.all(
      orders.map(async (order) => {
        const hotel = await Hotel.findById(order.product);
        return { ...order._doc, customer: user, product: hotel };
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const getOrdersEarnings = async (req, res, next) => {
  try {
    const orders = await Order.find({
      createdAt: {
        $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      },
    }).sort({ createdAt: -1 });

    const list = orders
      .map((order) => +order.amount)
      .reduce((total, item) => (total += item), 0);
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
