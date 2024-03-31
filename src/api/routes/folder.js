import { Router } from 'express';
import {
  getPath,
  uploadFolder,
  getCriteria,
  getChild,
  getRoot,
  getDomainFolder,
  getBreadCrumb,
  setChangeSave,
  getSupportFolder,
  getFolderAuthor,
  searchFolder,
  getSavedFolder,
} from '../controllers/folder/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

router.get('/get-path', auth, getPath);
router.post('/upload-folder', auth, uploadFolder);
router.get('/criteria', auth, getCriteria);
router.get('/get-child', auth, getChild);
router.get('/get-root', auth, getRoot);
router.post('/get-domain-folder', auth, getDomainFolder);
router.post('/get-breadcrumb', auth, getBreadCrumb);
router.post('/set-change-save', auth, setChangeSave);
router.get('/get-support-folder', auth, getSupportFolder);
router.get('/author', auth, getFolderAuthor);
router.get('/search', auth, searchFolder);
router.get('/get-saved-folder', auth, getSavedFolder);

export default router;
