import { Router } from 'express';
import {
  viewFile,
  downloadFile,
} from '../controllers/file/index.js';
import { auth, imageUpload } from '../middlewares/index.js';

const router = Router();

// EDIT
router.get('/', viewFile);
router.get('/download', downloadFile);

export default router;
