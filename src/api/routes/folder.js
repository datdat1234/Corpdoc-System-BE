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
router.get('/get-path', getPath);
router.post('/upload-folder', uploadFolder);
router.get('/get-child', getChild);
router.get('/get-root', getRoot);
router.post('/get-domain-folder', getDomainFolder);

export default router;
