import { Router } from 'express';
import {
  getUser,
  login,
  logout,
  refreshToken,
  editUserInfo,
  getAllUsersDept,
  resetPassword,
  changeStatus
} from '../controllers/user/index.js';
import { auth, checkManager, checkAdmin } from '../middlewares/index.js';

const router = Router();

// AUTH
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/refresh-token', refreshToken);

// EDIT
router.post('/edit-user-info', auth, editUserInfo);
router.post('/reset-password', auth, checkManager, resetPassword);
router.post('/change-status', auth, checkManager, changeStatus);

// GET
router.post('/get-all-users-dept', auth, checkManager, getAllUsersDept);

router.get('/', auth, getUser);

export default router;
