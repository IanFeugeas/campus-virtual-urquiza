const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Usuario = require('../models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('🟢 Conectado a MongoDB');

    const existeAdmin = await Usuario.findOne({ rol: 'admin' });

    if (existeAdmin) {
      console.log('⚠️ Ya existe un usuario admin. No se creó otro.');
      return mongoose.disconnect();
    }

    const admin = new Usuario({
      nombre: 'Administrador General',
      email: 'admin@terciariourquiza.edu.ar',
      password: 'admin123', // sin hashear, lo hace el pre('save')
      rol: 'admin',
      estado: 'aprobado'
  });

    await admin.save();
    console.log('✅ Usuario admin creado correctamente.');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB:', err);
  });