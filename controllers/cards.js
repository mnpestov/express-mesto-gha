const httpConstants = require('http2').constants;
const { Card } = require('../models/card');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    res.status(httpConstants.HTTP_STATUS_OK)
      .send(cards);
  } catch (err) {
    res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере', ...err });
  }
};
exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    res.status(httpConstants.HTTP_STATUS_CREATED)
      .send(await Card.create({ name, link, owner }));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Ошибка валидации полей', ...err });
    } else {
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
exports.deleteCard = async (req, res) => {
  try {
    if (!(await Card.findById(req.params.Id))) {
      throw new Error('not found');
    }
    res.status(httpConstants.HTTP_STATUS_OK)
      .send(await Card.findByIdAndRemove(req.params.Id).populate(['owner', 'likes']));
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(httpConstants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: 'Ошибка валидации id', ...err });
    } else if (err.message === 'not found') {
      res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка с указанным id не найдена.' });
    } else {
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
exports.putLike = async (req, res) => {
  try {
    const likeOwner = req.body.id;
    if (!(await Card.findById(req.params.Id))) {
      throw new Error('not found');
    }
    res.status(httpConstants.HTTP_STATUS_CREATED)
      .send(await Card.findByIdAndUpdate(
        req.params.Id,
        { $addToSet: { likes: likeOwner } },
        { new: true },
      ).populate(['owner', 'likes']));
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(httpConstants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: 'Ошибка валидации id', ...err });
    } else if (err.message === 'not found') {
      res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка с указанным id не найдена.' });
    } else {
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
exports.deleteLike = async (req, res) => {
  try {
    const likeOwner = req.body.id;
    if (!(await Card.findById(req.params.Id))) {
      throw new Error('not found');
    }
    res.status(httpConstants.HTTP_STATUS_CREATED)
      .send(await Card.findByIdAndUpdate(
        req.params.Id,
        { $pull: { likes: likeOwner } },
        { new: true },
      ).populate(['owner', 'likes']));
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(httpConstants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: 'Ошибка валидации id', ...err });
    } else if (err.message === 'not found') {
      res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка с указанным id не найдена.' });
    } else {
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
