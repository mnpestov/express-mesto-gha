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
    const newCard = await Card.create({ name, link, owner });
    const card = await Card.populate(newCard, 'owner');
    res.status(httpConstants.HTTP_STATUS_CREATED)
      .send(card);
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
    const deletedCard = await Card.findByIdAndRemove(req.params.id).populate(['owner', 'likes']);
    if (!deletedCard) {
      throw new Error('not found');
    }
    res.status(httpConstants.HTTP_STATUS_OK)
      .send(deletedCard);
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
    const likedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: likeOwner } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (!likedCard) {
      throw new Error('not found');
    }
    res.status(httpConstants.HTTP_STATUS_CREATED)
      .send(likedCard);
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
    const unlikedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: likeOwner } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (!unlikedCard) {
      throw new Error('not found');
    }
    res.status(httpConstants.HTTP_STATUS_CREATED)
      .send(unlikedCard);
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
