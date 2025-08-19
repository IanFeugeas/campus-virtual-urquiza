const express = require('express');
const router = express.Router();
const { obtenerPerfil, obtenerUsuarioPorId, actualizarUsuario } = require('../controllers/userController');
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/verificarRol');

// Perfil del usuario autenticado
router.get('/perfil', verificarToken, obtenerPerfil);

// Obtener usuario por ID
router.get('/:id', verificarToken, obtenerUsuarioPorId);

// Actualizar un usuario (propio o admin)
router.patch('/:id', verificarToken, actualizarUsuario);

module.exports = router;
