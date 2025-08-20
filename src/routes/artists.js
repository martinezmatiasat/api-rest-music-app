// Importar dependencias
const express = require('express');

// Importar controlador
const artistController = require('@/controllers/artistController.js');

// Cargar Router
const router = express.Router();

// Definir rutas
router.get("/test", artistController.test);

// Exportar rutas
module.exports = router;