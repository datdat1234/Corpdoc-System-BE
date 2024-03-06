import { Router } from 'express';
import {
  changePassword,
  getUser,
  login,
  logout,
  refreshToken,
  editUserInfo,
} from '../controllers/user/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

// AUTH
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/refresh-token', refreshToken);

// EDIT
router.post('/change-password', auth, changePassword);
router.post('/edit-user-info', auth, editUserInfo);

router.get('/', auth, getUser);

export default router;
