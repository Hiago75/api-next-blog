import { Router } from 'express';

import { CreateCategoryFactory, ListCategoriesFactory, DeleteCategoryFactory, ShowCategoryFactory } from '../factories';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();

const createCategoryController = CreateCategoryFactory();
const listCategoriesController = ListCategoriesFactory();
const showCategoryController = ShowCategoryFactory();
const deleteCategoryController = DeleteCategoryFactory();

router.get('/', listCategoriesController.handle.bind(listCategoriesController));
router.get('/:id', showCategoryController.handle.bind(showCategoryController));
router.post('/', ensureAuthenticated, createCategoryController.handle.bind(createCategoryController));
router.delete('/:id', ensureAuthenticated, deleteCategoryController.handle.bind(deleteCategoryController));

export default router;
