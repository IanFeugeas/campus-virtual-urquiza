import { Router } from 'express';
const router = Router();
import verificarToken from '../middlewares/authMiddleware.js';
import verificarRol from '../middlewares/verificarRol.js';
import { obtenerUsuarios, cambiarEstadoUsuario, eliminarUsuario } from '../controllers/adminController.js';

router.get('/usuarios', verificarToken, verificarRol('admin'), obtenerUsuarios);
router.patch('/usuarios/:id', verificarToken, verificarRol('admin'), cambiarEstadoUsuario);
router.delete('/usuario/:id', verificarToken, verificarRol('admin'), eliminarUsuario);

export default router;

