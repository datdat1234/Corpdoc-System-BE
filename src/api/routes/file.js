import { Router } from 'express';
import {
  viewFile,
  downloadFile,
  getCriteria,
  uploadFile,
  uploadSupportFile,
  getFile,
  setChangeSave,
  getFileAuthor,
  searchFile,
  editFile,
  getFileInfo,
  getUsedStorage,
} from '../controllers/file/index.js';
import { auth, fileUpload } from '../middlewares/index.js';

const router = Router();

router.get('/', auth, viewFile);
router.get('/download', auth, downloadFile);
router.get('/criteria', getCriteria);
router.post('/upload', fileUpload, auth, uploadFile);
router.post('/upload-support-domain', fileUpload, auth, uploadSupportFile);
router.get('/get-file', auth, getFile);
router.post('/set-change-save', auth, setChangeSave);
router.get('/author', auth, getFileAuthor);
router.get('/search', auth, searchFile);
router.post('/edit-file', auth, editFile);
router.post('/get-file-info', auth, getFileInfo);
router.post('/get-used-storage', auth, getUsedStorage);

export default router;
