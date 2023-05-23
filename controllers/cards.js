const httpConstants = require('http2').constants;
const { Card } = require('../models/card');
const NotFoundError = require('../errors/not-found-errors');
const ForbidenError = require('../errors/forbiden-errors');

exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    res.status(httpConstants.HTTP_STATUS_OK)
      .send(cards);
  } catch (err) {
    next(err);
  }
};
exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const newCard = await Card.create({ name, link, owner });
    const card = await Card.populate(newCard, 'owner');
    res.status(httpConstants.HTTP_STATUS_CREATED)
      .send(card);
  } catch (err) {
    next(err);
  }
};
exports.deleteCard = async (req, res, next) => {
  try {
    const сard = await Card.findById(req.params.id).populate(['owner', 'likes']);
    if (!сard) {
      throw new NotFoundError('card not found');
    }
    if (сard.owner._id.toString() === req.user._id) {
      const deletedCard = await Card.findByIdAndDelete(req.params.id).populate(['owner', 'likes']);
      if (!deletedCard) {
        throw new NotFoundError('card not found');
      }
      res.status(httpConstants.HTTP_STATUS_OK)
        .send(deletedCard);
    } else {
      throw new ForbidenError('OwnerID does not match cardID');
    }
  } catch (err) {
    next(err);
  }
};
exports.putLike = async (req, res, next) => {
  try {
    const likeOwner = req.user._id;
    const likedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: likeOwner } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (!likedCard) {
      throw new NotFoundError('card not found');
    }
    res.status(httpConstants.HTTP_STATUS_OK)
      .send(likedCard);
  } catch (err) {
    next(err);
  }
};
exports.deleteLike = async (req, res, next) => {
  try {
    const likeOwner = req.user._id;
    const unlikedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: likeOwner } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (!unlikedCard) {
      throw new NotFoundError('card not found');
    }
    res.status(httpConstants.HTTP_STATUS_OK)
      .send(unlikedCard);
  } catch (err) {
    next(err);
  }
};
