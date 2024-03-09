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
router.get('/', auth, viewFile);
router.get('/download', auth, downloadFile);
router.get('/criteria', auth, getCriteria);
router.post('/upload', auth, fileUpload, uploadFile);
router.get('/get-file', auth, getFile);

export default router;
