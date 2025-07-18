const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/verificarToken');
const verificarRol = require('../middlewares/verificarRol');
const { obtenerUsuarios } = require('../controllers/adminController');

router.get('/usuarios', verificarToken, verificarRol('admin'), obtenerUsuarios);

module.exports = router;

