import { Router } from 'express';
import {
  viewFile,
  downloadFile,
  getCriteria,
  uploadFile,
  uploadSupportFile,
  getFile,
  setChangeSave,
} from '../controllers/file/index.js';
import { auth, fileUpload } from '../middlewares/index.js';

const router = Router();

router.get('/', auth, viewFile);
router.get('/download', auth, downloadFile);
router.get('/criteria', auth, getCriteria);
router.post('/upload', auth, fileUpload, uploadFile);
router.post('/upload-support-domain', auth, fileUpload, uploadSupportFile);
router.get('/get-file', auth, getFile);
router.post('/set-change-save', auth, setChangeSave);

export default router;
