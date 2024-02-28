import { Router } from 'express';
import {
  viewFile,
  downloadFile,
  getCriteria,
  uploadFile,
  getFile,
} from '../controllers/file/index.js';
import { auth, fileUpload } from '../middlewares/index.js';

const router = Router();

// EDIT
router.get('/', viewFile);
router.get('/download', downloadFile);
router.get('/criteria', getCriteria);
router.post('/upload', fileUpload, uploadFile);
router.get('/get-file', getFile);

export default router;
