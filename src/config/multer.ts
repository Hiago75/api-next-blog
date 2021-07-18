import multer from 'multer';
import { extname, resolve } from 'path';

export default multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new Error('Something gone wrong'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}_${Date.now()}${extname(file.originalname)}`);
    },
  }),
});
