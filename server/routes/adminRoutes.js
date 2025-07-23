const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/verificarRol');
const { obtenerUsuarios, cambiarEstadoUsuario, eliminarUsuario } = require('../controllers/adminController');

router.get('/usuarios', verificarToken, verificarRol('admin'), obtenerUsuarios);
router.patch('/usuarios/:id', verificarToken, verificarRol('admin'), cambiarEstadoUsuario);
router.delete('/usuario/:id', verificarToken, verificarRol('admin'), eliminarUsuario);

module.exports = router;

