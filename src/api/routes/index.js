import { Router } from 'express';
import acct from './account.js';
import company from './company.js';
import plan from './plan.js';

const router = Router();

router.use('/account', acct);
router.use('/company', company);
router.use('/plan', plan);

export default router;
