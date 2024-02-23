import { Router } from 'express';
import {
  changePassword,
  deleteUser,
  getUser,
  login,
  logout,
  refreshToken,
} from '../controllers/user/index.js';
import { auth, imageUpload } from '../middlewares/index.js';

const router = Router();

// AUTH
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/refresh-token', refreshToken);

// EDIT
router.post('/change-password', auth, changePassword);

router.get('/', auth, getUser);
router.delete('/', auth, deleteUser);

export default router;
