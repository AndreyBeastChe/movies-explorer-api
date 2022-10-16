const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/UnauthorizedError');

const DEV_SECRET_KEY = 'secret';
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    next(new UnAuthorizedError('Необходима авторизация'));
    return;
  }

  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET_KEY);
    req.user = payload;
    next();
  } catch (err) {
    next(new UnAuthorizedError('Необходима авторизация'));
  }
};
