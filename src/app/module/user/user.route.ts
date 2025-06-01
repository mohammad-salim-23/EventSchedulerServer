import express from 'express';
import { UserControllers } from './user.controller';
import catchAsync from '../../utils/catchAsync';

const router = express.Router();


router.post('/register', catchAsync(UserControllers.registerUser));
router.post('/login', catchAsync(UserControllers.loginUser));
