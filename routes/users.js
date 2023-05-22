const express = require('express');

const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  getUserInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUserInfo);
userRoutes.get('/:id', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex(),
  }),
}), getUserById);
userRoutes.patch('/me', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
userRoutes.patch('/me/avatar', express.json(), celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
}), updateAvatar);

exports.userRoutes = userRoutes;
