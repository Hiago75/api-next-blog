import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import multer from 'multer';
import uploadConfig from '@config/upload';
import AuthorsController from "../controllers/AuthorsController";
import ProfilePhotosController from "../controllers/ProfilePhotosController";

const authorsRouter = Router();
const authorsController = new AuthorsController();
const profilePhotosController = new ProfilePhotosController();

const upload = multer(uploadConfig);

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

/* Profile photo */
authorsRouter.post(
  '/avatar',
  upload.single('photo'),
  profilePhotosController.create
);

authorsRouter.put(
  '/avatar/',
  upload.single('photo'),
  profilePhotosController.update
);
export default authorsRouter
