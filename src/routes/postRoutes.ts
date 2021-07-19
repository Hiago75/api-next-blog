import { Router } from 'express';

import { CreatePostsService, ListPostsService, DeletePostService } from '../services';
import { CreatePostsController, ListPostsController, DeletePostController } from '../controllers';

const router = Router();

const createPostsService = new CreatePostsService();
const createPostsController = new CreatePostsController(createPostsService);

const listsPostsService = new ListPostsService();
const listsPostsController = new ListPostsController(listsPostsService);

const deletePostService = new DeletePostService();
const deletePostController = new DeletePostController(deletePostService);

router.get('/', listsPostsController.handle.bind(listsPostsController));
router.post('/', createPostsController.handle.bind(createPostsController));
router.delete('/', deletePostController.handle.bind(deletePostController));

export default router;
