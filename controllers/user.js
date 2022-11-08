import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const updateUser = async (req, res, next) => {
  if (req.body.password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body, password: hash } },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted.');
  } catch (err) {
    next(err);
  }
};

export const getUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserCount = async (req, res, next) => {
  try {
    const users = await User.find({
      createdAt: {
        $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      },
    }).sort({ createdAt: -1 });
    res.status(200).json(users.length);
  } catch (err) {
    next(err);
  }
};
