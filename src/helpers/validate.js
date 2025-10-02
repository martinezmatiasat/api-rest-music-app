const validator = require('validator');

const validateUser = (user) => {
  if (!user.name) {
    return { ok: false, message: 'El nombre es obligatorio.' };
  } else if (typeof user.name !== 'string') {
    return { ok: false, message: 'El nombre debe ser una cadena de texto.' };
  } else if (!validator.isLength(user.name, { min: 2, max: 100 })) {
    return { ok: false, message: 'El nombre debe tener entre 2 y 100 caracteres.' };
  }

  if (user.surname && typeof user.surname !== 'string') {
    return { ok: false, message: 'El apellido debe ser una cadena de texto.' };
  } else if (!validator.isLength(user.surname, { min: 2, max: 100 })) {
    return { ok: false, message: 'El apellido debe tener entre 2 y 100 caracteres.' };
  }

  if (!user.nickname) {
    return { ok: false, message: 'El apodo es obligatorio.' };
  } else if (typeof user.nickname !== 'string') {
    return { ok: false, message: 'El apodo debe ser una cadena de texto.' };
  } else if (!validator.isLength(user.nickname, { min: 2, max: 100 })) {
    return { ok: false, message: 'El apodo debe tener entre 2 y 100 caracteres.' };
  }

  if (!user.email) {
    return { ok: false, message: 'El correo electrónico es obligatorio.' };
  } else if (typeof user.email !== 'string') {
    return { ok: false, message: 'El correo electrónico debe ser una cadena de texto.' };
  } else if (!validator.isEmail(user.email)) {
    return { ok: false, message: 'El correo electrónico no es válido.' };
  }

  if (!user.password) {
    return { ok: false, message: 'La contraseña es obligatoria.' };
  } else if (typeof user.password !== 'string') {
    return { ok: false, message: 'La contraseña debe ser una cadena de texto.' };
  } else if (!validator.isLength(user.password, { min: 6 })) {
    return { ok: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
  }

  if (!user.password) {
    return { ok: false, message: 'La contraseña es obligatoria.' };
  } else if (typeof user.password !== 'string') {
    return { ok: false, message: 'La contraseña debe ser una cadena de texto.' };
  } else if (!validator.isLength(user.password, { min: 6 })) {
    return { ok: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
  }

  if (user.role && typeof user.role !== 'string') {
    return { ok: false, message: 'El rol debe ser una cadena de texto.' };
  } else if (!['user', 'admin'].includes(user.role)) {
    return { ok: false, message: 'El rol es inválido.' };
  }

  return { ok: true };
};

const validateAdmin = (admin) => {
  if (!admin.email) {
    return { ok: false, message: 'El correo electrónico es obligatorio.' };
  } else if (typeof admin.email !== 'string') {
    return { ok: false, message: 'El correo electrónico debe ser una cadena de texto.' };
  } else if (!validator.isEmail(admin.email)) {
    return { ok: false, message: 'El correo electrónico no es válido.' };
  }

  if (!admin.password) {
    return { ok: false, message: 'La contraseña es obligatoria.' };
  } else if (typeof admin.password !== 'string') {
    return { ok: false, message: 'La contraseña debe ser una cadena de texto.' };
  } else if (!validator.isLength(admin.password, { min: 4 })) {
    return { ok: false, message: 'La contraseña debe tener al menos 4 caracteres.' };
  }

  return { ok: true };
};

const validateArtist = (artist) => {
  if (!artist.name) {
    return { ok: false, message: 'El nombre es obligatorio.' };
  } else if (typeof artist.name !== 'string') {
    return { ok: false, message: 'El nombre debe ser una cadena de texto.' };
  } else if (!validator.isLength(artist.name, { min: 2, max: 100 })) {
    return { ok: false, message: 'El nombre debe tener entre 2 y 100 caracteres.' };
  }

  if (!artist.description) {
    return { ok: false, message: 'La descripción es obligatoria.' };
  } else if (typeof artist.description !== 'string') {
    return { ok: false, message: 'La descripción debe ser una cadena de texto.' };
  } else if (!validator.isLength(artist.description, { min: 20, max: 1000 })) {
    return { ok: false, message: 'La descripción debe tener entre 20 y 1000 caracteres.' };
  }

  if (artist.image && !/\.(jpg|jpeg|png|gif)$/i.test(artist.image)) {
    return { ok: false, message: 'La imagen debe tener un formato válido (jpg, jpeg, png, gif).' };
  }

  return { ok: true };
};

const validateAlbum = (album) => {
  if (!album.title) {
    return { ok: false, message: 'El título es obligatorio.' };
  } else if (typeof album.title !== 'string') {
    return { ok: false, message: 'El título debe ser una cadena de texto.' };
  } else if (!validator.isLength(album.title, { min: 2, max: 100 })) {
    return { ok: false, message: 'El título debe tener entre 2 y 100 caracteres.' };
  }

  if (!album.artist) {
    return { ok: false, message: 'El artista es obligatorio.' };
  } else if (typeof album.artist !== 'string') {
    return { ok: false, message: 'El artista debe ser una cadena de texto.' };
  }

  if (!album.description) {
    return { ok: false, message: 'La descripción es obligatoria.' };
  } else if (typeof album.description !== 'string') {
    return { ok: false, message: 'La descripción debe ser una cadena de texto.' };
  } else if (!validator.isLength(album.description, { min: 20, max: 1000 })) {
    return { ok: false, message: 'La descripción debe tener entre 20 y 1000 caracteres.' };
  }

  if (!album.year) {
    return { ok: false, message: 'El año es obligatorio y debe ser válido.' };
  } else if (typeof album.year !== 'number' || album.year < 1900 || album.year > new Date().getFullYear()) {
    return { ok: false, message: 'El año debe ser un número válido.' };
  }

  if (album.image && !/\.(jpg|jpeg|png|gif)$/i.test(album.image)) {
    return { ok: false, message: 'La imagen debe tener un formato válido (jpg, jpeg, png, gif).' };
  }

  return { ok: true };
};

const validateSong = (song) => {
  if (!song.title) {
    return { ok: false, message: 'El título es obligatorio.' };
  } else if (typeof song.title !== 'string') {
    return { ok: false, message: 'El título debe ser una cadena de texto.' };
  } else if (!validator.isLength(song.title, { min: 2, max: 100 })) {
    return { ok: false, message: 'El título debe tener entre 2 y 100 caracteres.' };
  }

  if (!song.duration) {
    return { ok: false, message: 'La duración es obligatoria.' };
  } else if (song.duration < 10) {
    return { ok: false, message: 'La duración mínima es de 10 segundos.' };
  } else if (song.duration > 3600) {
    return { ok: false, message: 'La duración máxima es de 1 hora (3600 segundos).' };
  }

  if (!song.year) {
    return { ok: false, message: 'El año es obligatorio.' };
  } else if (typeof song.year !== 'number' || song.year < 1900 || song.year > new Date().getFullYear()) {
    return { ok: false, message: 'El año debe ser un número válido.' };
  }

  if (!song.audio) {
    return { ok: false, message: 'El archivo de audio es obligatorio.' };
  } else if (!/\.(mp3|wav|flac)$/i.test(song.audio)) {
    return { ok: false, message: 'El archivo de audio debe tener un formato válido (mp3, wav, flac).' };
  }

  return { ok: true };
};

module.exports = {
  validateUser,
  validateAdmin,
  validateArtist,
  validateAlbum,
  validateSong
};
