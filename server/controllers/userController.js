const User = require('../models/User').default;

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

module.exports = { obtenerPerfil };