import { Router } from 'express';
import { CreateAuthorController } from '../controllers/Authors/CreateAuthorController';
import { CreateAuthorService } from '../services/Authors/CreateAuthorService';

const router = Router();
const createAuthorService = new CreateAuthorService();
const createAuthorController = new CreateAuthorController(createAuthorService);

router.post('/', createAuthorController.handle.bind(createAuthorController));

export default router;
