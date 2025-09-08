const verificarRol = (...rolesPermitidos) => {

    return (req, res, next) => {
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ mensaje: 'Acceso denegado. Rol insuficiente.'})
        }
        console.log("Rol del usuario:", req.usuario.rol, " | Roles permitidos:", rolesPermitidos);
       next ();
    };
};

export default verificarRol;