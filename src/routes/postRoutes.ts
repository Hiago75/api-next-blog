import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import {
  CountPostsFactory,
  CreatePostFactory,
  DeletePostFactory,
  ListPostsFactory,
  ShowPostFactory,
  UpdatePostsFactory,
} from '../factories';

const router = Router();

const createPostsController = CreatePostFactory();
const listPostsController = ListPostsFactory();
const countPostsController = CountPostsFactory();
const showPostController = ShowPostFactory();

const updatePostsController = UpdatePostsFactory();
const deletePostController = DeletePostFactory();

router.get('/', listPostsController.handle.bind(listPostsController));
router.get('/post/:slug', showPostController.handle.bind(showPostController));
router.get('/count', countPostsController.handle.bind(countPostsController));

router.post('/', ensureAuthenticated, createPostsController.handle.bind(createPostsController));

router.put('/:id', ensureAuthenticated, updatePostsController.handle.bind(updatePostsController));

router.delete('/:id', ensureAuthenticated, deletePostController.handle.bind(deletePostController));

export default router;
