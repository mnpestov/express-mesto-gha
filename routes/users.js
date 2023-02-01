const express = require('express');

const { getUsers, getUserById, createUser } = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', express.json(), createUser);

exports.userRoutes = userRoutes;
