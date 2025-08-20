const validator = require('validator');

const validateUser = (user) => {
  let error = null;

  if (!user.name) {
    error = new Error('El nombre es obligatorio.');
  } else if (typeof user.name !== 'string') {
    error = new Error('El nombre debe ser una cadena de texto.');
  } else if (!validator.isLength(user.name, { min: 2, max: 100 })) {
    error = new Error('El nombre debe tener entre 2 y 100 caracteres.');
  }

  if (user.surname && typeof user.surname !== 'string') {
    error = new Error('El apellido debe ser una cadena de texto.');
  } else if (!validator.isLength(user.surname, { min: 2, max: 100 })) {
    error = new Error('El apellido debe tener entre 2 y 100 caracteres.');
  }

  if (!user.nickname) {
    error = new Error('El apodo es obligatorio.');
  } else if (typeof user.nickname !== 'string') {
    error = new Error('El apodo debe ser una cadena de texto.');
  } else if (!validator.isLength(user.nickname, { min: 2, max: 100 })) {
    error = new Error('El apodo debe tener entre 2 y 100 caracteres.');
  }

  if (!user.email) {
    error = new Error('El correo electrónico es obligatorio.');
  } else if (typeof user.email !== 'string') {
    error = new Error('El correo electrónico debe ser una cadena de texto.');
  } else if (!validator.isEmail(user.email)) {
    error = new Error('El correo electrónico no es válido.');
  }

  if (!user.password) {
    error = new Error('La contraseña es obligatoria.');
  } else if (typeof user.password !== 'string') {
    error = new Error('La contraseña debe ser una cadena de texto.');
  } else if (!validator.isLength(user.password, { min: 6 })) {
    error = new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  if (user.role && typeof user.role !== 'string') {
    error = new Error('El rol debe ser una cadena de texto.');
  } else if (!['user', 'admin'].includes(user.role)) {
    error = new Error('El rol es inválido.');
  }

  if (error) {
    error.status = 400;
    throw error;
  }

  return true;
};

module.exports = {
  validateUser
};
