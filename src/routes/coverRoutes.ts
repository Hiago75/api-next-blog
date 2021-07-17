import { Router } from 'express';
import upload from '../config/multer';

import { CreateCoversController } from '../controllers';
import { CreateCoverService } from '../services';

const createCoverService = new CreateCoverService();
const createCoverController = new CreateCoversController(createCoverService);

const router = Router();

router.post('/', upload.single('image'), createCoverController.handle.bind(createCoverController));

export default router;
