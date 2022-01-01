import { Router } from 'express';
import { CreateTagFactory, ListTagsFactory, DeleteTagFactory } from '../factories';
import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAuthenticated';

const router = Router();

const createTagController = CreateTagFactory();
const listTagsController = ListTagsFactory();
const deleteTagController = DeleteTagFactory();

// GET routes
router.get('/', listTagsController.handle.bind(listTagsController));

// POST routes
router.post('/', ensureAuthenticated, createTagController.handle.bind(createTagController));

// DELETE routes
router.delete('/:id', ensureAuthenticated, deleteTagController.handle.bind(deleteTagController));

export default router;
