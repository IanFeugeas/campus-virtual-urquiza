import { Router } from 'express';
const router = Router();
import { obtenerPerfil, obtenerUsuarioPorId, actualizarUsuario } from '../controllers/userController.js';
import verificarToken from '../middlewares/authMiddleware.js';
import verificarRol from '../middlewares/verificarRol.js';

// Perfil del usuario autenticado
router.get('/perfil', verificarToken, obtenerPerfil);

// Obtener usuario por ID (cada uno el suyo, admin cualquiera)
router.get('/:id', verificarToken, obtenerUsuarioPorId);

// Actualizar usuario (propio o admin)
router.patch('/:id',verificarRol('alumno','admin'), verificarToken, actualizarUsuario);

export default router;
