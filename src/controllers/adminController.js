const Admin = require('@/models/Admin');
const bcrypt = require('bcrypt');
const { validateAdmin } = require('@/helpers/validate');

const test = (req, res) => {
  res.json({ message: "¡Ruta de prueba de administrador funcionando!" });
};

const createAdmin = async (req, res) => {
  try {
    const adminData = req.body;

    const validation = validateAdmin(adminData);
    if (!validation.ok) {
      return res.status(400).json({ message: validation.message });
    }

    const emailExists = await Admin.findOne({ email: adminData.email });
    if (emailExists) {
      return res.status(400).json({ message: 'Ya hay un administrador con este email.' });
    }

    adminData.password = await bcrypt.hash(adminData.password, 10);

    const admin = new Admin(adminData);
    await admin.save();

    const adminToReturn = admin.toObject();
    delete adminToReturn.password;

    return res.status(201).json({ message: 'Administrador creado exitosamente.', result: adminToReturn });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña actual incorrecta.' });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    return res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

module.exports = {
  test,
  createAdmin,
  updatePassword
};
