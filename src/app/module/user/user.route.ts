import express from 'express';
import { UserControllers } from './user.controller';
import catchAsync from '../../utils/catchAsync';
import { checkAlreadyLoggedIn } from '../../utils/checkAlreadyLoggedIn';


const router = express.Router();
router.post('/register-doctor', catchAsync(UserControllers.registerDoctor));
router.post('/register-patient', catchAsync(UserControllers.registerPatient));
router.post('/login',  catchAsync(UserControllers.loginUser));
router.post('/logout', catchAsync(UserControllers.logoutUser));

export const UserRoutes = router;
