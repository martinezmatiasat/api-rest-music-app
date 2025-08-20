// Importar mongoose
const mongoose = require('mongoose');

// Metodo de conectar
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/music_app');
    console.log('Conexión a la BD exitosa');
  } catch (error) {
    console.error('Error al conectar a la BD:', error);
  }
};

// Exportar la conexión
module.exports = connectDB;