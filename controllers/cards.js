const { Card } = require('../models/card');

exports.getCards = async (req, res) => {
  const cards = await Card.find({});
  res.status(200)
    .send(cards);
};
exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user.id;
  res.status(201)
    .send(await Card.create({ name, link, owner }));
};
exports.deleteCard = async (req, res) => {
  res.status(200)
    .send(await Card.findByIdAndRemove(req.params.id));
};
exports.putLike = async (req, res) => {
  const likeOwner = req.user.id;
  res.status(201)
    .send(await Card.findByIdAndUpdate(req.params.Id, ({ $push: { likes: likeOwner } })));
};
