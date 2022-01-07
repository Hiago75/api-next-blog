import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

const uploadFolder = resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${file.originalname}_${fileHash}_${Date.now()}${extname(file.originalname)}`

      callback(null, fileName);
    }
  })
}
