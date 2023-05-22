const httpConstants = require('http2').constants;

module.exports = ((err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(httpConstants.HTTP_STATUS_BAD_REQUEST)
      .send({ message: 'Ошибка валидации id', ...err });
  } else if (err.message === 'not found') {
    res.status(httpConstants.HTTP_STATUS_NOT_FOUND)
      .send({ message: 'Пользователь с указанным id не найден', ...err });
  } else if (err.message === 'wrong login or password') {
    res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Не верный логин или пароль', ...err });
  } else if (err.message === 'unauthorized') {
    res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация', ...err });
  } else if (err.name === 'ValidationError') {
    res.status(httpConstants.HTTP_STATUS_BAD_REQUEST)
      .send({ message: 'Ошибка валидации полей', ...err });
  } else if (err.code === 11000) {
    res.status(httpConstants.HTTP_STATUS_CONFLICT)
      .send({ message: 'Такой пользователь уже существует', ...err });
  } else if (err.name === 'JsonWebTokenError') {
    res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'С токеном что-то не так', ...err });
  } else if (err.message === 'OwnerID does not match cardID') {
    res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'ID владельца карточки не совпадает с ID карты', ...err });
  } else {
    res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на сервере', ...err });
  }

  next();
});
