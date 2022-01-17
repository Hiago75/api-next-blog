import { Router } from 'express';
import PostsController from '../controllers/PostsController';
import { celebrate, Joi, Segments } from 'celebrate';

const postsRouter = Router()
const postsController = new PostsController();

// List
postsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      _start: Joi.string().required(),
      _limit: Joi.string().required(),
      _category: Joi.string().required(),
      _author: Joi.string().required(),
    }
  }),
  postsController.index
);

// Show
postsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      slug: Joi.string().required(),
    }
  }),
  postsController.show
);

// Create
postsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      content: Joi.string().required(),
      photoUrl: Joi.string(),
      categoryId: Joi.string().required(),
      coverId: Joi.string().required(),
      tagIds: Joi.string().required(),
    }
  }),
  postsController.create
);

// Update
postsRouter.put(
  '/:id',
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      title: Joi.string(),
      content: Joi.string(),
      categoryId: Joi.string(),
      coverId: Joi.string(),
      slug: Joi.string(),
    }
  }),
  postsController.update
);

export default postsRouter;
