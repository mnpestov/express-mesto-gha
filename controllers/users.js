const httpConstants = require('http2').constants;
const { User } = require('../models/user');

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
exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    res.status(httpConstants.HTTP_STATUS_CREATED)
      .send(await User.create({ name, about, avatar }));
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
