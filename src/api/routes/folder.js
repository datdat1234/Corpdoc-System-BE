import { Router } from 'express';
import { getPath, uploadFolder } from '../controllers/folder/index.js';
import { auth, fileUpload } from '../middlewares/index.js';

const router = Router();

// EDIT
router.get('/get-path', getPath);
router.post('/upload-folder', uploadFolder);

export default router;
