const express = require('express');

const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', express.json(), createCard);
cardRoutes.delete('/:id', deleteCard);
cardRoutes.put('/:Id/likes', express.json(), putLike);
cardRoutes.delete('/:Id/likes', express.json(), deleteLike);

exports.cardRoutes = cardRoutes;
