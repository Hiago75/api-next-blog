import { Router } from 'express';
import { CreateCoversController } from '../controllers';
import { CreateCoverService } from '../services';
import upload from '../config/multer';

const router = Router();
const createCoverService = new CreateCoverService();
const createCoverController = new CreateCoversController(createCoverService);

router.post('/', upload.single('image'), createCoverController.handle.bind(createCoverController));

export default router;
