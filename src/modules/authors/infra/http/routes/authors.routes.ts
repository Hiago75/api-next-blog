import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import AuthorsController from "../controllers/AuthorsController";

const authorsRouter = Router();
const authorsController = new AuthorsController();

// List
authorsRouter.get('/', authorsController.index);

// Show
authorsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  authorsController.show
)

// Create
authorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      admin: Joi.boolean(),
    }
  }),
  authorsController.create
);

// Update
authorsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string(),
    }
  }),
  authorsController.update
)
export default authorsRouter
