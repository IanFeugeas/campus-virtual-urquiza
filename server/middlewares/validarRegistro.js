export default (req, res, next) => {
  const { nombre, email, password, rol, carrera } = req.body;

  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
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

  next();
};