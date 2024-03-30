import { Router } from 'express';
import {
  viewFile,
  downloadFile,
  uploadFile,
  uploadSupportFile,
  getFile,
  setChangeSave,
  getFileAuthor,
  searchFile,
} from '../controllers/file/index.js';
import { auth, fileUpload } from '../middlewares/index.js';

const router = Router();

router.get('/', auth, viewFile);
router.get('/download', auth, downloadFile);
router.post('/upload', fileUpload, auth, uploadFile);
router.post('/upload-support-domain', fileUpload, auth, uploadSupportFile);
router.get('/get-file', auth, getFile);
router.post('/set-change-save', auth, setChangeSave);
router.get('/get-file', auth, getFile);
router.get('/author', auth, getFileAuthor);
router.get('/search', auth, searchFile);

export default router;
