import multer from 'multer';
import { memoryStorage } from 'multer';

const storage = memoryStorage();
const fileFilter = (_req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/svg+xml' ||
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Please choose a valid file.'), false);
  }
};

export default multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: fileFilter,
}).single('file');