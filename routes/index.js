const express = require('express');
const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');
const NotFoundError = require('../errors/not-found-errors');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);
routes.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

exports.routes = routes;
