import { Router } from 'express';
import {
  viewFile,
  downloadFile,
  getCriteria,
  uploadFile,
} from '../controllers/file/index.js';
import { auth, fileUpload } from '../middlewares/index.js';

const router = Router();

// EDIT
router.get('/', viewFile);
router.get('/download', downloadFile);
router.get('/criteria', getCriteria);
router.post('/upload', fileUpload, uploadFile);

export default router;
