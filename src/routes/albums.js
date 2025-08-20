// Importar dependencias
const express = require('express');

// Importar controlador
const albumController = require('@/controllers/albumController.js');

// Cargar Router
const router = express.Router();

// Definir rutas
router.get("/test", albumController.test);

// Exportar rutas
module.exports = router;