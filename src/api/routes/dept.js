import { Router } from 'express';
import {
  getDeptName,
} from '../controllers/dept/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

router.get('/get-dept-name', auth, getDeptName);

export default router;
