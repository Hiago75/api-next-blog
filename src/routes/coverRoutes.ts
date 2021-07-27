import { Router } from 'express';
import upload from '../config/multer';

import { CreateCoverFactory, ListCoversFactory } from '../factories';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createCoverController = CreateCoverFactory();
const listCoversController = ListCoversFactory();

const router = Router();

router.get('/', listCoversController.handle.bind(listCoversController));
router.post('/', ensureAuthenticated, upload.single('image'), createCoverController.handle.bind(createCoverController));

export default router;
