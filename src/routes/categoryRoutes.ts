import { Router } from 'express';
import { CreateCategoryController, DeleteCategoryController, ListCategoriesController } from '../controllers';
import { CreateCategoryService, DeleteCategoryService, ListCategoriesService } from '../services';

const router = Router();

const createCategoryService = new CreateCategoryService();
const createCategoryController = new CreateCategoryController(createCategoryService);

const listCategoriesService = new ListCategoriesService();
const listCategoriesController = new ListCategoriesController(listCategoriesService);

const deleteCategoryService = new DeleteCategoryService();
const deleteCategoryController = new DeleteCategoryController(deleteCategoryService);

router.get('/', listCategoriesController.handle.bind(listCategoriesController));
router.post('/', createCategoryController.handle.bind(createCategoryController));
router.delete('/', deleteCategoryController.handle.bind(deleteCategoryController));

export default router;
