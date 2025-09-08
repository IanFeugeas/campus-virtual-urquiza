import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { nombre, email, password, rol, carrera } = req.body;

    // Verificar si ya existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'Este email ya está registrado' });
    }

    // Crear y guardar usuario
    const nuevoUsuario = new User({ nombre, email, password, rol, carrera });
    await nuevoUsuario.save();

    // Generar token
    if (!process.env.JWT_SECRET) {
      throw new Error("Falta la variable JWT_SECRET en el entorno");
    }

    const token = jwt.sign(
      { id: nuevoUsuario._id, rol: nuevoUsuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ mensaje: 'Usuario creado', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    if (usuario.estado !== 'aprobado') {
      return res.status(403).json({
        mensaje: 'Tu cuenta aún no fue aprobada o fue rechazada.',
      });
    }

    const passwordValido = await usuario.compararPassword(password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("Falta la variable JWT_SECRET en el entorno");
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};