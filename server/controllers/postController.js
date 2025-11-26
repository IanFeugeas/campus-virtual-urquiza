import Post from '../models/Post.js';

export const crearPost = async (req, res) => {
    try {
        const { titulo, contenido, etiquetas } = req.body;

        const nuevoPost = await Post.create({
            titulo,
            contenido,
            etiquetas,
            autor: req.user.id,
        });

        res.status(201).json(nuevoPost);
    }catch(error) {
        res.status(500).json({ message: 'Error al crear el post', error});
    }
};

export const obtenerPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('autor', 'nombre email rol')
            .sort({ createdAt: -1 });
        
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posts', error});    
    }
};

export const obtenerPostPorId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('autor', 'nombre email rol')
      .populate('comentarios.autor', 'nombre email rol');

    if (!post) return res.status(404).json({ message: 'Post no encontrado' });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el post', error });
  }
};

export const actualizarPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post no encontrado' });

    if (post.autor.toString() !== req.user.id)
      return res.status(403).json({ message: 'No autorizado' });

    const { titulo, contenido, etiquetas } = req.body;

    post.titulo = titulo || post.titulo;
    post.contenido = contenido || post.contenido;
    post.etiquetas = etiquetas || post.etiquetas;

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el post', error });
  }
};

export const eliminarPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post no encontrado' });

    if (post.autor.toString() !== req.user.id && req.user.rol !== 'admin')
      return res.status(403).json({ message: 'No autorizado' });

    await post.deleteOne();

    res.json({ message: 'Post eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el post', error });
  }
};