import { Router } from 'express';
import user from './user.js';
import file from './file.js';
import folder from './folder.js';
const router = Router();

router.use('/user', user);
router.use('/file', file);
router.use('/folder', folder);

export default router;
