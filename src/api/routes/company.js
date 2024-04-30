import { Router } from 'express';
import {
  getCompanies,
  getCompanyById,
  updateCompany,
  addCompany,
  blockCompany,
} from '../controllers/company/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

router.get('/get-companies', auth, getCompanies);
router.get('/get-company-by-id', auth, getCompanyById);
router.put('/update-company', auth, updateCompany);
router.post('/add-company', auth, addCompany);
router.post('/block-company', auth, blockCompany);

export default router;
