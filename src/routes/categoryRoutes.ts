import { Router } from 'express';
import { CreateCategoryController } from '../controllers/Categories/CreateCategoryController';
import { CreateCategoryService } from '../services/Categories/CreateCategoryService';

const router = Router();

const createCategoryService = new CreateCategoryService();
const createCategoryController = new CreateCategoryController(createCategoryService);

router.post('/', createCategoryController.handle.bind(createCategoryController));

export default router;
