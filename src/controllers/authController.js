const bcrypt = require('bcrypt');
const Admin = require('@/models/Admin');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('@/helpers/token');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
    }

    const user = await Admin.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const userToReturn = user.toObject();
    delete userToReturn.password;

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: 'Login exitoso.',
      result: { access_token: accessToken, expires_in: 900, user: userToReturn }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

const refresh = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) return res.status(401).json({ message: 'Refresh token no encontrado.' });

    let error;
    const payload = await verifyToken(token).catch(err => { error = err; });
    if (!payload) return res.status(403).json({ message: 'Refresh token inválido.', error: error.message });

    const accessToken = generateAccessToken(payload.id);

    const user = await Admin.findById(payload.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const userToReturn = user.toObject();
    delete userToReturn.password;

    return res.status(200).json({
      message: 'Refresh exitoso.',
      result: {
        access_token: accessToken,
        expires_in: 900,
        user: userToReturn
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: '/'
    });
    return res.status(200).json({ message: 'Logout exitoso.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

module.exports = {
  login,
  refresh,
  logout
};
