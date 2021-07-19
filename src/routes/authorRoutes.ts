import { Router } from 'express';
import { CreateAuthorController, ListAuthorsController } from '../controllers';
import { ShowAuthorController } from '../controllers/Authors/ShowAuthorController';
import { CreateAuthorService, ListAuthorsService } from '../services';
import { ShowAuthorService } from '../services/Authors/ShowAuthorService';

const router = Router();

const createAuthorService = new CreateAuthorService();
const createAuthorController = new CreateAuthorController(createAuthorService);

const listAuthorsService = new ListAuthorsService();
const listAuthorsController = new ListAuthorsController(listAuthorsService);

const showAuthorService = new ShowAuthorService();
const showAuthorController = new ShowAuthorController(showAuthorService);

router.get('/', listAuthorsController.handle.bind(listAuthorsController));
router.get('/:id', showAuthorController.handle.bind(showAuthorController));
router.post('/', createAuthorController.handle.bind(createAuthorController));

export default router;
