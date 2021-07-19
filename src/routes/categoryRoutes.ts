import { Router } from 'express';
import { CreateCategoryController, DeleteCategoryController, ListCategoriesController } from '../controllers';
import { ShowCategoryController } from '../controllers/Categories/ShowCategoryController';
import { CreateCategoryService, DeleteCategoryService, ListCategoriesService } from '../services';
import { ShowCategoryService } from '../services/Categories/ShowCategoryService';

const router = Router();

const createCategoryService = new CreateCategoryService();
const createCategoryController = new CreateCategoryController(createCategoryService);

const listCategoriesService = new ListCategoriesService();
const listCategoriesController = new ListCategoriesController(listCategoriesService);

const showCategoryService = new ShowCategoryService();
const showCategoryController = new ShowCategoryController(showCategoryService);

const deleteCategoryService = new DeleteCategoryService();
const deleteCategoryController = new DeleteCategoryController(deleteCategoryService);

router.get('/', listCategoriesController.handle.bind(listCategoriesController));
router.get('/:id', showCategoryController.handle.bind(showCategoryController));
router.post('/', createCategoryController.handle.bind(createCategoryController));
router.delete('/', deleteCategoryController.handle.bind(deleteCategoryController));

export default router;
