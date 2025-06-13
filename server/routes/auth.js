const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');


// POST /api/register


router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, rol, carrera } = req.body;

    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }

    const dominioValido = '@terciariourquiza.edu.ar';
    if (!email.endsWith(dominioValido)) {
      return res.status(400).json({ mensaje: 'Email no es institucional' });
    }

    if (rol === 'alumno' && !/^\d+@terciariourquiza\.edu\.ar$/.test(email)) {
      return res.status(400).json({ mensaje: 'Email de alumno inválido. Debe ser DNI@...' });
    }

    if (rol === 'profesor' && !/^[a-z]+\.[a-z]+@terciariourquiza\.edu\.ar$/.test(email)) {
      return res.status(400).json({ mensaje: 'Email de profesor inválido. Debe ser apellido.nombre@...' });
    }

    if (rol === 'alumno' && !carrera) {
      return res.status(400).json({ mensaje: 'Debe seleccionar una carrera' });
    }

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'Este email ya está registrado' });
    }

    const nuevoUsuario = new User({ nombre, email, password, rol, carrera });
    await nuevoUsuario.save();

    const token = jwt.sign({ id: nuevoUsuario._id, rol: nuevoUsuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ mensaje: 'Usuario registrado con éxito', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});


// POST /api/login

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar que haya datos

        if (!email || !password) {
            return res.status(400).json({ mensaje: 'Email y contraseña requeridos'});
        }

        // Buscar al usuario por email
        
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas'});
        }

        // Validar contraseña

        const contraseñaValida = await usuario.compararPassword(password);
        if (!contraseñaValida){
            return res.status(401).json({ mensaje: 'Credenciales inválidas'});
        }

        // Generar JWT 

        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1d'}
        );

        // Enviar token al frontend 

        res.status(200).json({
            mensaje: 'Login exitoso',
            token, 
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del servidor'});
    }
});

module.exports = router;
