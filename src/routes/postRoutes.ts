import { Router } from 'express';

import { CreatePostsService, ListPostsService } from '../services';
import { CreatePostsController, ListPostsController } from '../controllers';
import { DeletePostService } from '../services/Posts/DeletePostService';
import { DeletePostController } from '../controllers/Posts/DeletePostController';

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
