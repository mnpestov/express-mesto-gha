const express = require('express');

const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
  res.send('hello');
});
userRoutes.get('/:id', (req, res) => {
  res.send('hello');
});
userRoutes.post('/', express.json(), (req, res) => {
  res.send(req.body);
});

exports.routes = userRoutes;
