const express = require('express');

const {
  getUsers,
  // getUserById,
  getUserInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
// userRoutes.get('/:id', getUserById);
userRoutes.get('/me', express.json(), getUserInfo);
userRoutes.patch('/me', express.json(), updateUser);
userRoutes.patch('/me/avatar', express.json(), updateAvatar);

exports.userRoutes = userRoutes;
