import { Router } from 'express';
import { CreateAuthorController, ListAuthorsController } from '../controllers';
import { CreateAuthorService, ListAuthorsService } from '../services';

const router = Router();

const createAuthorService = new CreateAuthorService();
const createAuthorController = new CreateAuthorController(createAuthorService);

const listAuthorsService = new ListAuthorsService();
const listAuthorsController = new ListAuthorsController(listAuthorsService);

router.get('/', listAuthorsController.handle.bind(listAuthorsController));
router.post('/', createAuthorController.handle.bind(createAuthorController));

export default router;
