import { Router } from 'express';
const router = Router();

import { 
  obtenerPerfil, 
  obtenerUsuarioPorId, 
  actualizarUsuario 
} from '../controllers/userController.js';

import verificarToken from '../middlewares/authMiddleware.js';

// Perfil del usuario autenticado
router.get(
  '/perfil',
  verificarToken,
  obtenerPerfil
);

// Obtener usuario por ID (solo él mismo o admin)
router.get(
  '/:id',
  verificarToken,
  obtenerUsuarioPorId
);

// Actualizar un usuario (propio o admin)
router.patch(
  '/:id',
  verificarToken,
  actualizarUsuario
);

export default router;