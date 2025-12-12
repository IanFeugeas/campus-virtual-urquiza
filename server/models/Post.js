import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({

    titulo: { 
        type: String, 
        required: true, 
        trim: true 
    },
    cuerpo: { 
        type: String, 
        required: true 
    },
    
    autor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },

    tipo: {
        type: String,
        enum: ['general', 'anuncio'],
        default: 'general',
    },

    carrera: {
        type: String,
        default: 'General',
    },

    fechaCreacion: { 
        type: Date, 
        default: Date.now 
    },
    
    comentariosCount: { 
        type: Number, 
        default: 0 
    }

}, {
    timestamps: true
});

export default mongoose.model('Post', postSchema);