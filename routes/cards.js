const express = require('express');

const {
  getCards,
  createCard,
  deleteCard,
  putLike,
} = require('../controllers/cards');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', express.json(), createCard);
cardRoutes.delete('/:id', deleteCard);
cardRoutes.put('/:Id/likes', express.json(), putLike);

exports.cardRoutes = cardRoutes;
