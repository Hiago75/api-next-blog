import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/Auth/AuthenticateUserController';
import { AuthenticateUserService } from '../services/Auth/AuthenticateUserService';

const router = Router();

const authenticateUserService = new AuthenticateUserService();
const authenticateUserController = new AuthenticateUserController(authenticateUserService);

router.post('/', authenticateUserController.handle.bind(authenticateUserController));

export default router;
