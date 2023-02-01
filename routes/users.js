const express = require('express');

const { getUsers, createUser } = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
// userRoutes.get('/:id', getUsersById);
userRoutes.post('/', express.json(), createUser);

exports.routes = userRoutes;
