import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import TagsController from "../controllers/TagsController";

// TODO: add celebrate
const tagsRouter = Router();
const tagsController = new TagsController();

// List
tagsRouter.get('/', tagsController.index);

// Create
tagsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required()
    }
  }),
  tagsController.create
);

// Delete
tagsRouter.delete(
  '/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    }
  }),
  tagsController.delete
);

export default tagsRouter;
