import { Router } from 'express';
import acct from './account.js';
const router = Router();

router.use('/account', acct);

export default router;
