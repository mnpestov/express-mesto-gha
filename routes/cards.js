const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
}), createCard);
cardRoutes.delete('/:id', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex(),
  }),
}), deleteCard);
cardRoutes.put('/:Id/likes', express.json(), celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex(),
  }),
}), putLike);
cardRoutes.delete('/:Id/likes', express.json(), celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex(),
  }),
}), deleteLike);

exports.cardRoutes = cardRoutes;
