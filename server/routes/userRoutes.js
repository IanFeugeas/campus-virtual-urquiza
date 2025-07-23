const express = require('express');
const router = express.Router();
const { obtenerPerfil, obtenerUsuarioPorId } = require('../controllers/userController');
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/verificarRol');

router.get('/perfil', verificarToken, verificarRol('alumno', 'docente', 'admin'), obtenerPerfil);
router.get('/:id', verificarToken, obtenerUsuarioPorId);

module.exports = router;
