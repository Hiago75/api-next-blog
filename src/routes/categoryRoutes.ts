import { Router } from 'express';
import { CreateCategoryController, ListCategoriesController } from '../controllers';
import { CreateCategoryService, ListCategoriesService } from '../services';

const router = Router();

const createCategoryService = new CreateCategoryService();
const createCategoryController = new CreateCategoryController(createCategoryService);

const listCategoriesService = new ListCategoriesService();
const listCategoriesController = new ListCategoriesController(listCategoriesService);

router.get('/', listCategoriesController.handle.bind(listCategoriesController));
router.post('/', createCategoryController.handle.bind(createCategoryController));

export default router;
