import express from 'express';
import {
  crearPost,
  obtenerPosts,
  obtenerPostPorId,
  actualizarPost,
  eliminarPost,
} from '../controllers/postController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', obtenerPosts);
router.get('/:id', obtenerPostPorId);

router.post('/', authMiddleware, crearPost);
router.put('/:id', authMiddleware, actualizarPost);
router.delete('/:id', authMiddleware, eliminarPost);

export default router;