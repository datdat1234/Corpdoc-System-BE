import { Router } from 'express';
import {
  getPath,
  uploadFolder,
  getChild,
  getRoot,
  getDomainFolder,
} from '../controllers/folder/index.js';
import { auth, fileUpload } from '../middlewares/index.js';

const router = Router();

// EDIT
router.get('/get-path', auth, getPath);
router.post('/upload-folder', auth, uploadFolder);
router.get('/get-child', auth, getChild);
router.get('/get-root', auth, getRoot);
router.post('/get-domain-folder', auth, getDomainFolder);

export default router;
