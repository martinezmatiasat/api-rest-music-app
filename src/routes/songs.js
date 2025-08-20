// Importar dependencias
const express = require('express');

// Importar controlador
const songController = require('@/controllers/songController.js');

// Cargar Router
const router = express.Router();

// Definir rutas
router.get("/test", songController.test);

// Exportar rutas
module.exports = router;