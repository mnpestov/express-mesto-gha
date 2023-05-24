const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-erros');

const JWT_SOLT = 'wotj21ds0f7!hjhjh^';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('unauthorized');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SOLT);
  } catch (err) {
    next(err);
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
