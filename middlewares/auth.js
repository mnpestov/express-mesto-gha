const jwt = require('jsonwebtoken');

const JWT_SOLT = 'wotj21ds0f7!hjhjh^';

// module.exports = (req, res, next) => {
//   let payload;
//   try {
//     const token = req.headers.authorization;
//     if (!token) {
//       throw new Error('unauthorized');
//     }
//     payload = jwt.verify(token, JWT_SOLT);
//   } catch (err) {
//     next(err);
//   }
//   req.user = payload; // записываем пейлоуд в объект запроса
//   next(); // пропускаем запрос дальше
// };
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('unauthorized');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SOLT);
  } catch (err) {
    next(err);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
