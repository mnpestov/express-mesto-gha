const { User } = require('../models/user');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200)
      .send(users);
  } catch (err) {
    res.status(500)
      .send({ message: 'Ошибка на сервере', ...err });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const userById = await User.findById(req.params.id);
    if (!userById) {
      throw new Error('not found');
    }
    res.status(200)
      .send(userById);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400)
        .send({ message: 'Ошибка валидации id', ...err });
    } else if (err.message === 'not found') {
      res.status(404)
        .send({ message: 'Пользователь с указанным id не найден', ...err });
    } else {
      res.status(500)
        .send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    res.status(201)
      .send(await User.create({ name, about, avatar }));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400)
        .send({ message: 'Ошибка валидации полей', ...err });
    } else {
      res.status(500)
        .send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    if (!User.findById(req.user._id)) {
      throw new Error('not found');
    }
    res.status(201)
      .send(await User.findByIdAndUpdate(
        req.user._id,
        { name, about },
        { new: true, runValidators: true },
      ));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400)
        .send({ message: 'Ошибка валидации полей', ...err });
    } else if (err.message === 'not found') {
      res.status(404)
        .send({ message: 'Пользователь с указанным id не найден', ...err });
    } else {
      res.status(500)
        .send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!User.findById(req.user._id)) {
      throw new Error('not found');
    }
    res.status(201)
      .send(await User.findByIdAndUpdate(
        req.user._id,
        { avatar },
        { new: true, runValidators: true },
      ));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400)
        .send({ message: 'Ошибка валидации полей', ...err });
    } else if (err.message === 'not found') {
      res.status(404)
        .send({ message: 'Пользователь с указанным id не найден', ...err });
    } else {
      res.status(500)
        .send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
