import { Router } from 'express';

import { CreateAuthorFactory, ListAuthorFactory, ShowAuthorFactory, updateAuthorFactory } from '../factories';
import { ensureAdmin } from '../shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAuthenticated';

const router = Router();

const createAuthorController = CreateAuthorFactory();
const listAuthorsController = ListAuthorFactory();
const showAuthorController = ShowAuthorFactory();
const updateAuthorController = updateAuthorFactory();

router.get('/', listAuthorsController.handle.bind(listAuthorsController));
router.get('/:id', showAuthorController.handle.bind(showAuthorController));
router.post('/', ensureAuthenticated, ensureAdmin, createAuthorController.handle.bind(createAuthorController));
router.put('/', ensureAuthenticated, updateAuthorController.handle.bind(updateAuthorController));

export default router;
