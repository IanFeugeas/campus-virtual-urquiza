const User = require('../models/User');

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find().select('-password'); // sin contraseñas
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
  }
};

const cambiarEstadoUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        
        if (!['aprobado', 'rechazado'].includes(estado)) {
            return res.status(400).json({ mensaje: 'Estado invalido. Debe ser "aprobado" o "rechazado" '});
        }

        const usuario = await User.findById(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado'});
        }

        usuario.estado = estado;
        await usuario.save();

        res.status(200).json({ mensaje: `Usuario ${estado} correctamente`});

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor'});
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const usuario = await User.findByIdAndDelete(req.params.id);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado'});
        }

        res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
    }
};

module.exports = {
  obtenerUsuarios,
  cambiarEstadoUsuario,
  eliminarUsuario
};

