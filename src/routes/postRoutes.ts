import { Router } from 'express';

import { CreatePostsService, ListPostsService } from '../services';
import { CreatePostsController, ListPostsController } from '../controllers';

const router = Router();

const createPostsService = new CreatePostsService();
const createPostsController = new CreatePostsController(createPostsService);

const listsPostsService = new ListPostsService();
const listsPostsController = new ListPostsController(listsPostsService);

router.get('/', listsPostsController.handle.bind(listsPostsController));
router.post('/', createPostsController.handle.bind(createPostsController));

export default router;
