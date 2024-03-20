import { Router } from 'express';
import {
  getPath,
  uploadFolder,
  getChild,
  getRoot,
  getDomainFolder,
  getBreadCrumb,
  setChangeSave,
  getSupportFolder,
} from '../controllers/folder/index.js';
import { auth, fileUpload } from '../middlewares/index.js';

const router = Router();

router.get('/get-path', auth, getPath);
router.post('/upload-folder', auth, uploadFolder);
router.get('/get-child', auth, getChild);
router.get('/get-root', auth, getRoot);
router.post('/get-domain-folder', auth, getDomainFolder);
router.post('/get-breadcrumb', auth, getBreadCrumb);
router.post('/set-change-save', auth, setChangeSave);
router.get('/get-support-folder', auth, getSupportFolder);

export default router;
