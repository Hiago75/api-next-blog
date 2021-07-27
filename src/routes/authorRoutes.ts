import { Router } from 'express';

import { CreateAuthorFactory, ListAuthorFactory, ShowAuthorFactory } from '../factories';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();

const createAuthorController = CreateAuthorFactory();
const listAuthorsController = ListAuthorFactory();
const showAuthorController = ShowAuthorFactory();

router.get('/', listAuthorsController.handle.bind(listAuthorsController));
router.get('/:id', showAuthorController.handle.bind(showAuthorController));
router.post('/', ensureAuthenticated, ensureAdmin, createAuthorController.handle.bind(createAuthorController));

export default router;
