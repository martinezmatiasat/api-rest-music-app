const { validateUser } = require('@/helpers/validate');
const User = require('@/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
  res.json({ message: "¡Ruta de prueba de usuario funcionando!" });
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const userToReturn = user.toObject();
    delete userToReturn.password;

    res.status(200).json({ result: userToReturn });
  } catch (error) {
    res.status(500).json({ message: 'Error en la solicitud.', error: error });
  }
};

const createUser = async (req, res) => {
  try {
    const user = req.body;
    validateUser(user);

    const emailExists = await User.findOne({ email: user.email });
    if (emailExists) {
      return res.status(400).json({ message: 'Ya hay un usuario con este email.' });
    }

    const nicknameExists = await User.findOne({ nickname: user.nickname });
    if (nicknameExists) {
      return res.status(400).json({ message: 'Ya hay un usuario con este nickname.' });
    }

    user.password = await bcrypt.hash(user.password, 10);

    const newUser = new User(user);
    await newUser.save();

    const userToReturn = newUser.toObject();
    delete userToReturn.password;

    res.status(201).json({ message: 'Usuario creado exitosamente.', result: userToReturn });
  } catch (error) {
    res.status(500).json({ message: 'Error en la solicitud.', error: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    const userToReturn = user.toObject();
    delete userToReturn.password;

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      //domain: process.env.COOKIE_DOMAIN || 'localhost',
      maxAge: 30 * 24 * 60 * 60 * 1000
    }).status(200).json({ result: userToReturn });

  } catch (error) {
    res.status(500).json({ message: 'Error en la solicitud.', error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    validateUser(userData);

    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const userToReturn = updatedUser.toObject();
    delete userToReturn.password;

    res.status(200).json({ message: 'Usuario actualizado exitosamente.', result: userToReturn });
  } catch (error) {
    res.status(500).json({ message: 'Error en la solicitud.', error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente.', result: deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error en la solicitud.', error: error });
  }
};

module.exports = {
  test,
  getUser,
  createUser,
  login,
  updateUser,
  deleteUser
};
