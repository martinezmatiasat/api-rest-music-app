const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó token de autenticación.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token no válido o expirado' });
  }
}

module.exports = {
  checkAuth
};