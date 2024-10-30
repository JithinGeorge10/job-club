import { Router } from "express";
import { UserController } from "../controller/userContoller";
import {authenticateToken} from '../middleware/authenticateToken'
const userRoute = Router()
const userController = new UserController();

userRoute.get('/get-userDetails',authenticateToken, userController.getUserController.bind(userController));
userRoute.post('/add-employment',authenticateToken, userController.addEmploymentController.bind(userController));
userRoute.post('/add-education',authenticateToken, userController.addEducationController.bind(userController));
userRoute.post('/add-skills',authenticateToken, userController.addSkillsController.bind(userController));
userRoute.post('/add-resume',authenticateToken, userController.addResumeController.bind(userController));
userRoute.post('/add-profile-image', userController.addProfileImageController.bind(userController));
userRoute.post('/delete-resume',authenticateToken, userController.addDeleteResumeController.bind(userController));
userRoute.post('/start-payment',authenticateToken, userController.startPaymentController.bind(userController));
userRoute.post('/paymentSuccess', userController.successPaymentController.bind(userController));
userRoute.post('/saveJob',authenticateToken, userController.saveJobController.bind(userController));







export default userRoute