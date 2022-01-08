import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionsRouter = Router()
const sessionsController = new SessionsController();

// Show
sessionsRouter.get('/',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
    }
  }),
  sessionsController.show
);

// Create
sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }
  }),
  sessionsController.create
);

// Update
sessionsRouter.put(
  '/:refreshToken',
  celebrate({
    [Segments.PARAMS]: {
      refreshToken: Joi.string().uuid().required(),
    }
  }), sessionsController.update
);

// Delete
sessionsRouter.delete(
  '/:refreshToken',
  celebrate({
    [Segments.PARAMS]: {
      refreshToken: Joi.string().uuid().required(),
    }
  }),
  sessionsController.delete
);

export default sessionsRouter;
