const httpConstants = require('http2').constants;
const express = require('express');
const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);
routes.use('*', (req, res) => {
  res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Маршрут не найден' });
});

exports.routes = routes;
