import { Router } from 'express';

import { CreatePostsService, ListPostsService, DeletePostService } from '../services';
import { CreatePostsController, ListPostsController, DeletePostController } from '../controllers';
import { ShowPostService } from '../services/Posts/ShowPostService';
import { ShowPostController } from '../controllers/Posts/ShowPostController';

const router = Router();

const createPostsService = new CreatePostsService();
const createPostsController = new CreatePostsController(createPostsService);

const listsPostsService = new ListPostsService();
const listsPostsController = new ListPostsController(listsPostsService);

const showPostService = new ShowPostService();
const showPostController = new ShowPostController(showPostService);

const deletePostService = new DeletePostService();
const deletePostController = new DeletePostController(deletePostService);

router.get('/', listsPostsController.handle.bind(listsPostsController));
router.get('/:slug', showPostController.handle.bind(showPostController));
router.post('/', createPostsController.handle.bind(createPostsController));
router.delete('/', deletePostController.handle.bind(deletePostController));

export default router;
