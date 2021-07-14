import { Router } from 'express';
import { CreateAuthorController } from '../controllers';
import { CreateAuthorService } from '../services';

const router = Router();

const createAuthorService = new CreateAuthorService();
const createAuthorController = new CreateAuthorController(createAuthorService);

router.post('/', createAuthorController.handle.bind(createAuthorController));

export default router;
