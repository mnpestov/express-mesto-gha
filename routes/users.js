const express = require('express');

const {
  getUsers, getUserById, createUser, updateUser,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', express.json(), createUser);
userRoutes.patch('/me', express.json(), updateUser);

exports.userRoutes = userRoutes;
