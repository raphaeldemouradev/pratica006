import { Router } from 'express';
import { registerUser, loginUser, getUserById } from '../controllers/authController.js';

const router = Router();

// Rotas de Autenticação (POST)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Rota de Perfil / Consulta de Usuário (GET)
router.get('/user/:id', getUserById);

export default router;