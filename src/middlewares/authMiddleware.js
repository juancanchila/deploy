// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token)
    return res.status(400).json({ message: 'Token no proporcionado' });

  const bearer = token.split(' ');
  const tokenValue = bearer.length === 2 ? bearer[1] : bearer[0];

  try {
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET || 'secret123');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = { verifyToken };
