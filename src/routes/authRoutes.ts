import { Router } from 'express';

import { AuthenticateUserFactory, RefreshUserTokenFactory, RetrieveUserDataFactory } from '../factories';
import { LogoutUserFactory } from '../factories/Auth/LogoutUserFactory';
const router = Router();

const authenticateUserController = AuthenticateUserFactory();
const retrieveUserDataController = RetrieveUserDataFactory();
const refreshUserTokenController = RefreshUserTokenFactory();
const logoutUserController = LogoutUserFactory();

// Login user on aplication creating a Token and returning on response
router.post('/login', authenticateUserController.handle.bind(authenticateUserController));

// Retrive user data from database and return this data on response
router.get('/retrieve', retrieveUserDataController.handle.bind(retrieveUserDataController));

// Use the refresh token to generate another token when the old one expires
router.get('/refresh', refreshUserTokenController.handle.bind(refreshUserTokenController));

// Delete the refresh token from DB
router.delete('/logout', logoutUserController.handle.bind(logoutUserController));

export default router;
