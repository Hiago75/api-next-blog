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

// GET routes
router.get('/', listPostsController.handle.bind(listPostsController));
router.get('/post/:slug', showPostController.handle.bind(showPostController));
router.get('/count', countPostsController.handle.bind(countPostsController));

// POST routes
router.post('/', ensureAuthenticated, createPostsController.handle.bind(createPostsController));

// PUT routes
router.put('/:id', ensureAuthenticated, updatePostsController.handle.bind(updatePostsController));

// DELETE routes
router.delete('/:id', ensureAuthenticated, deletePostController.handle.bind(deletePostController));

export default router;
