import { Router } from "express";
import { UserController } from "../controller/userContoller";

const userRoute = Router()
const userController = new UserController();

userRoute.get('/get-userDetails', userController.getUserController.bind(userController));
userRoute.post('/add-employment', userController.addEmploymentController.bind(userController));
userRoute.post('/add-education', userController.addEducationController.bind(userController));
userRoute.post('/add-skills', userController.addSkillsController.bind(userController));
userRoute.post('/add-resume', userController.addResumeController.bind(userController));



export default userRoute