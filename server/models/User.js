import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';

const userSchema = new Schema({

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
        enum: ['TÉCNICO SUPERIOR EN DESARROLLO DE SOFTWARE', 'TÉCNICO SUPERIOR EN ANÁLISIS FUNCIONAL DE SISTEMAS INFORMÁTICOS', 'TÉCNICO SUPERIOR EN INFRAESTRUCTURA DE TECNOLOGÍA DE LA INFORMACIÓN'],
        required: function() {
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
    this.password = await hash(this.password, 10);
    next();
});

// Metodo para validar la contraseña

userSchema.methods.compararPassword = function (passwordIngresada) {
    return compare(passwordIngresada, this.password);
};

export default model('User', userSchema);