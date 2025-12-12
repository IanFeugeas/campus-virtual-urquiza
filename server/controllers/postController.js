import Post from '../models/Post.js';
import User from '../models/User.js';

export const createPost = async (req, res) => {
    const { titulo, cuerpo, tipo } = req.body;

    const userId = req.usuario.id; 
    const userRole = req.usuario.rol;

    if (tipo === 'anuncio' && !['docente', 'admin'].includes(userRole)) {
        return res.status(403).json({ 
            mensaje: 'Solo docentes o administradores pueden crear publicaciones de tipo "anuncio".' 
        });
    }

    try {
        const autor = await User.findById(userId);
        if (!autor) {
            return res.status(404).json({ mensaje: 'Autor no encontrado.' });
        }
        
        const postCarrera = autor.rol === 'alumno' ? autor.carrera : 'General';

        const newPost = new Post({
            titulo,
            cuerpo,
            tipo,
            autor: userId,
            carrera: postCarrera,
        });

        await newPost.save();

        res.status(201).json({ 
            mensaje: 'Publicación creada exitosamente.', 
            post: { 
                ...newPost._doc,
                autor: { id: autor._id, nombre: autor.nombre, rol: autor.rol }
            }
        });
    } catch (error) {
        console.error("Error al crear el post:", error);
        res.status(500).json({ mensaje: 'Error interno del servidor al crear el post.' });
    }
};

export const getPosts = async (req, res) => {

    const userRole = req.usuario.rol;
    const userCarrera = req.usuario.carrera;
    
    let query = {};

    if (userRole === 'alumno') {
        query = {
            $or: [
                { carrera: 'General' }, 
                { carrera: userCarrera }
            ]
        };
    }

    try {
        const posts = await Post.find(query)
            .populate('autor', 'nombre rol carrera') 
            .sort({ createdAt: -1 }); 

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error al obtener posts:", error);
        res.status(500).json({ mensaje: 'Error interno del servidor al obtener publicaciones.' });
    }
};