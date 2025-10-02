const jwt = require('jsonwebtoken');

const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, ACCESS_SECRET, { 
    expiresIn: '15m' 
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, REFRESH_SECRET, { 
    expiresIn: '30d' 
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, REFRESH_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };