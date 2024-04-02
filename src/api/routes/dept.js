import { Router } from 'express';
import {
  getDeptName,
  getDept,
} from '../controllers/dept/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

router.get('/get-dept-name', auth, getDeptName);
router.get('/get-dept', auth, getDept);

export default router;
