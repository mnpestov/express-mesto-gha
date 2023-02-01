const { User } = require('../models/user');

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
};
exports.getUserById = async (req, res) => {
  const userById = await User.findById(req.params.id);
  res.status(200).send(userById);
};
exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  res.status(201).send(await User.create({ name, about, avatar }));
};
exports.updateUser = async (req, res) => {
  const { name, about } = req.body;
  res.status(201).send(await User.findByIdAndUpdate(req.user.id, { name, about }));
};
