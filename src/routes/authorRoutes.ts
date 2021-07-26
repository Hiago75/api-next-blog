import { Router } from 'express';
import { CreateAuthorController, ListAuthorsController, ShowAuthorController } from '../controllers';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
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
router.post('/', ensureAuthenticated, ensureAdmin, createAuthorController.handle.bind(createAuthorController));

export default router;
