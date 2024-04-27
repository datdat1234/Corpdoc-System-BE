import { Router } from 'express';
import {
  login,
  logout,
  refreshToken,
} from '../controllers/account/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

// AUTH
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/refresh-token', refreshToken);

export default router;
