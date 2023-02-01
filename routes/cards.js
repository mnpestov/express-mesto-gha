const express = require('express');

const { getCards, createCard, deleteCard } = require('../controllers/cards');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', express.json(), createCard);
cardRoutes.delete('/:id', deleteCard);

exports.cardRoutes = cardRoutes;
