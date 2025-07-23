const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    nombre: { type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
        return email.endsWith('@terciariourquiza.edu.ar');
        },
        message: 'El correo debe ser institucional'
        }
    },
    password: { type: String, required: true },
    rol: { 
        type: String, 
        enum: ['alumno', 'profesor', 'admin'],
        default: 'alumno'
    },
    carrera: {
        type: String,
        enum: [
            'Desarrollo de Software',
            'Analista Funcional',
            'Infraestructura de Software'
        ],
        required: function () {
            return this.rol === 'alumno';
        }
    },
    estado: { 
        type: String, 
        enum: ['pendiente', 'aprobado', 'rechazado'], 
        default: 'pendiente'
    }
});

// Hashear la contraseña antes de guardar

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Metodo para validar la contraseña

userSchema.methods.compararPassword = function (passwordIngresada) {
    return bcrypt.compare(passwordIngresada, this.password);
};

module.exports = mongoose.model('User', userSchema);