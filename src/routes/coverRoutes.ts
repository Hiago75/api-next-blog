import { Router } from 'express';
import uploadConfig from '@config/upload';

import { CreateCoverFactory, ListCoversFactory } from '../factories';
import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';

const createCoverController = CreateCoverFactory();
const listCoversController = ListCoversFactory();

const upload = multer(uploadConfig)

const router = Router();

router.get('/', listCoversController.handle.bind(listCoversController));
router.post('/', ensureAuthenticated, upload.single('image'), createCoverController.handle.bind(createCoverController));

export default router;
