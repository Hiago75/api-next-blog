import { Router } from 'express';
import upload from '../config/multer';

import { CreateProfilePhotoFactory } from '../factories';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();

const createProfilePhotoController = CreateProfilePhotoFactory();

router.post(
  '/',
  ensureAuthenticated,
  upload.single('image'),
  createProfilePhotoController.handle.bind(createProfilePhotoController),
);

export default router;
