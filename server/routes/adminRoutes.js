const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/verificarRol');
const { obtenerUsuarios, cambiarEstadoUsuario } = require('../controllers/adminController');

router.get('/usuarios', verificarToken, verificarRol('admin'), obtenerUsuarios);
router.patch('/usuarios/:id', verificarToken, verificarRol('admin'), cambiarEstadoUsuario);

module.exports = router;

