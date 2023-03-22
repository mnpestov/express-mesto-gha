const httpConstants = require('http2').constants;
const jwt = require('jsonwebtoken');

const JWT_SOLT = 'wotj21ds0f7!hjhjh^';

module.exports = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('unauthorized');
    }
    payload = jwt.verify(token, JWT_SOLT);
  } catch (err) {
    if (err.message === 'unauthorized') {
      res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED)
        .send({ message: 'Необходимо авторизоваться', ...err });
    } else {
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка на сервере', ...err });
    }
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
