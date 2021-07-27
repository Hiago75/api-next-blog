import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import {
  CreatePostFactory,
  DeletePostFactory,
  ListPostsFactory,
  ListPostsFromCategoryFactory,
  ShowPostFactory,
} from '../factories';

const router = Router();

const createPostsController = CreatePostFactory();
const listPostsController = ListPostsFactory();
const showPostController = ShowPostFactory();
const listPostsFromCategoryController = ListPostsFromCategoryFactory();
const deletePostController = DeletePostFactory();

router.get('/', listPostsController.handle.bind(listPostsController));
router.get('/:slug', showPostController.handle.bind(showPostController));
router.get('/categories/:category', listPostsFromCategoryController.handle.bind(listPostsFromCategoryController));
router.post('/', ensureAuthenticated, createPostsController.handle.bind(createPostsController));
router.delete('/', ensureAuthenticated, deletePostController.handle.bind(deletePostController));

export default router;
