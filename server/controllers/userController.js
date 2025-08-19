const User = require('../models/User');

const obtenerPerfil = async (req, res) => {

    try {
        const usuario = await User.findById(req.usuario.id).select('-password');
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado'});
        }
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el perfil' });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    if (req.usuario.id !== req.params.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({ mensaje: 'No tenés permiso para acceder a este perfil' });
    }

    const usuario = await User.findById(req.params.id).select('-password');

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el perfil' });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.usuario.id !== id && req.usuario.rol !== 'admin') {
      return res.status(403).json({ mensaje: 'No tenes permiso para modificar los datos de este perfil'});
    }

    const { nombre, carrera } = req.body;

    const usuario = await User.findByIdAndUpdate(
      id,
      { nombre, carrera },
      { new: true, runValidators: true } 
    ).select('-password');

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado'});
    }

    res.status(200).json({
      mensaje: 'Usuario actualizado correctamente',
      usuario,
    });

  }catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
  }
};

module.exports = {
    obtenerPerfil,
    obtenerUsuarioPorId,
    actualizarUsuario
    };