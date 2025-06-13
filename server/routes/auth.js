import { Router } from 'express';
const router = Router();
import User, { findOne } from '../models/User';
import { sign } from 'jsonwebtoken';

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Validar campos básicos
    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }

    // Verificar si ya existe el email
    const usuarioExistente = await findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'El email ya está registrado' });
    }

    // Crear y guardar el nuevo usuario
    const nuevoUsuario = new User({ nombre, email, password, rol });
    await nuevoUsuario.save();

    // Generar token
    const token = sign({ id: nuevoUsuario._id, rol: nuevoUsuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ mensaje: 'Usuario creado', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

export default router;
