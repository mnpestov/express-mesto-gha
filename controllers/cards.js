const { Card } = require('../models/card');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200)
      .send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Ошибка на сервере', ...err });
  }
};
exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    res.status(201)
      .send(await Card.create({ name, link, owner }));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Ошибка валидации полей', ...err });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
exports.deleteCard = async (req, res) => {
  try {
    if (!(await Card.findById(req.params.Id))) {
      throw new Error('not found');
    }
    res.status(200)
      .send(await Card.findByIdAndRemove(req.params.Id));
  } catch (err) {
    if (err.message === 'not found') {
      res.status(404).send({ message: 'Карточка с указанным id не найдена.' });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
exports.putLike = async (req, res) => {
  try {
    const likeOwner = req.body.id;
    if (!(await Card.findById(req.params.Id))) {
      throw new Error('not found');
    }
    res.status(201)
      .send(await Card.findByIdAndUpdate(
        req.params.Id,
        { $addToSet: { likes: likeOwner } },
        { new: true },
      ));
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400)
        .send({ message: 'Ошибка валидации id', ...err });
    } else if (err.message === 'not found') {
      res.status(404).send({ message: 'Карточка с указанным id не найдена.' });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
exports.deleteLike = async (req, res) => {
  try {
    const likeOwner = req.body.id;
    if (!(await Card.findById(req.params.Id))) {
      throw new Error('not found');
    }
    res.status(201)
      .send(await Card.findByIdAndUpdate(
        req.params.Id,
        { $pull: { likes: likeOwner } },
        { new: true },
      ));
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400)
        .send({ message: 'Ошибка валидации id', ...err });
    } else if (err.message === 'not found') {
      res.status(404).send({ message: 'Карточка с указанным id не найдена.' });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере', ...err });
    }
  }
};
