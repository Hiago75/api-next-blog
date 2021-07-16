import { Router } from 'express';
import { CreateCoversController } from '../controllers';
import { CreateCoverService } from '../services';
import upload from '../config/multer';
import { CreatePostsService } from '../services/Posts/CreatePostsService';
import { CreatePostsController } from '../controllers/Posts/CreatePostsController';

const router = Router();

// TODO: Separate createCover responsibility from posts routes
const createCoverService = new CreateCoverService();
const createCoverController = new CreateCoversController(createCoverService);
const createPostsService = new CreatePostsService();
const createPostsController = new CreatePostsController(createPostsService, createCoverController);

router.post('/', upload.single('image'), createPostsController.handle.bind(createPostsController));

export default router;
