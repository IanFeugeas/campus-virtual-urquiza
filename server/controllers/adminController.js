const User = require('../models/User');

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los usuarios'});
    }
};

module.exports = {
    obtenerUsuarios
};
