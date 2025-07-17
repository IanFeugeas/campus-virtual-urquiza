const express = require('express');
const router = express.Router();
const { obtenerPerfil } = require('../controllers/userController');
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/verificarRol');

router.get('/perfil', verificarToken, verificarRol('alumno', 'docente', 'admin'), obtenerPerfil);

module.exports = router;
