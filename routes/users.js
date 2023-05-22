const express = require('express');

const { celebrate, Joi } = require('celebrate');
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
userRoutes.patch('/me', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
userRoutes.patch('/me/avatar', express.json(), celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateAvatar);

exports.userRoutes = userRoutes;
