import { Router } from 'express';
import {
  changePassword,
  deleteUser,
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
router.post('/refresh-token', auth, refreshToken);

// EDIT
router.post('/change-password', auth, changePassword);
router.post('/edit-user-info', editUserInfo);

router.get('/', auth, getUser);
router.delete('/', auth, deleteUser);

export default router;
