import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contenido: { type: String, required: true },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    etiquetas: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comentarios: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);