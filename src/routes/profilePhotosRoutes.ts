import { Router } from 'express';
import upload from '../config/multer';

import { CreateProfilePhotoFactory, UpdateProfilePhotoFactory } from '../factories';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();

const createProfilePhotoController = CreateProfilePhotoFactory();
const updateProfilePhotoController = UpdateProfilePhotoFactory();

router.post(
  '/',
  ensureAuthenticated,
  upload.single('image'),
  createProfilePhotoController.handle.bind(createProfilePhotoController),
);

router.put(
  '/',
  ensureAuthenticated,
  upload.single('image'),
  updateProfilePhotoController.handle.bind(updateProfilePhotoController),
);

export default router;
