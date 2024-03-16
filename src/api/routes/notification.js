import { Router } from 'express';
import {
  getNoti,
} from '../controllers/notification/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

router.get('/get-noti', getNoti);

export default router;
