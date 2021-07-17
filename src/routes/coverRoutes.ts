import { Router } from 'express';
import upload from '../config/multer';

import { CreateCoversController, ListCoversController } from '../controllers';
import { CreateCoverService, ListCoversService } from '../services';

const createCoverService = new CreateCoverService();
const createCoverController = new CreateCoversController(createCoverService);

const listCoversService = new ListCoversService();
const listCoversController = new ListCoversController(listCoversService);

const router = Router();

router.get('/', listCoversController.handle.bind(listCoversController));
router.post('/', upload.single('image'), createCoverController.handle.bind(createCoverController));

export default router;
