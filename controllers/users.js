const httpConstants = require('http2').constants;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const SOLT_ROUNDS = 10;

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(httpConstants.HTTP_STATUS_OK)
      .send(users);
  } catch (err) {
    res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на сервере', ...err });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const userById = await User.findById(req.params.id);
    if (!userById) {
      throw new Error('not found');
    }
    res.status(httpConstants.HTTP_STATUS_OK)
      .send(userById);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(httpConstants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: 'Ошибка валидации id', ...err });
    } else if (err.message === 'not found') {
      res.status(httpConstants.HTTP_STATUS_NOT_FOUND)
        .send({ message: 'Пользователь с указанным id не найден', ...err });
    } else {
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('not found');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new Error('not found');
    }
    const token = jwt.sign({ _id: user._id }, 'some-secret-key');
    res.status()
      .send({ token });
  } catch (err) {
    if (err.message === 'not found') {
      res.status(httpConstants.HTTP_STATUS_NOT_FOUND)
        .send({ message: 'Пользователь с указанным id не найден', ...err });
    } else {
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
exports.createUser = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      about,
      avatar,
    } = req.body;
    const hash = await bcrypt.hash(password, SOLT_ROUNDS);
    const newUser = await User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    });
    res.status(httpConstants.HTTP_STATUS_CREATED)
      .send({
        email: newUser.email,
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
      });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(httpConstants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: 'Ошибка валидации полей', ...err });
    } else {
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw new Error('not found');
    }
    res.status(httpConstants.HTTP_STATUS_OK)
      .send(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(httpConstants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: 'Ошибка валидации полей', ...err });
    } else if (err.message === 'not found') {
      res.status(httpConstants.HTTP_STATUS_NOT_FOUND)
        .send({ message: 'Пользователь с указанным id не найден', ...err });
    } else {
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const updatedAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!updatedAvatar) {
      throw new Error('not found');
    }
    res.status(httpConstants.HTTP_STATUS_OK)
      .send(updatedAvatar);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(httpConstants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: 'Ошибка валидации полей', ...err });
    } else if (err.message === 'not found') {
      res.status(httpConstants.HTTP_STATUS_NOT_FOUND)
        .send({ message: 'Пользователь с указанным id не найден', ...err });
    } else {
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
