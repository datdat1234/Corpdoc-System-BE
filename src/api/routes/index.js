import { Router } from 'express';
import user from './user.js';
import file from './file.js';
import folder from './folder.js';
import notification from './notification.js';
const router = Router();

router.use('/user', user);
router.use('/file', file);
router.use('/folder', folder);
router.use('/noti', notification);

export default router;
