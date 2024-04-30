import { Router } from 'express';
import {
  getPlan,
} from '../controllers/plan/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

router.get('/get-plan', auth, getPlan);

export default router;
