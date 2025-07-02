const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const validarRegistro = require('../middlewares/validarRegistro');

router.post('/register', validarRegistro, register);
router.post('/login', login);

module.exports = router;
