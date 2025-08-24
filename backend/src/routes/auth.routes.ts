import { Router } from 'express';
import { login, register, me, logout } from '../controllers/auth.controller';
import { protect } from '../middleware/auth';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, me);
router.post('/logout', protect, logout);
export default router;