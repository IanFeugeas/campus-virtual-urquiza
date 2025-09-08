import { Router } from 'express';
const router = Router();
import { register, login } from '../controllers/authController.js';
import validarRegistro from '../middlewares/validarRegistro.js';

router.post('/register', validarRegistro, register);
router.post('/login', login);

export default router;
