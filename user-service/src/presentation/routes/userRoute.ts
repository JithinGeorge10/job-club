import { Router } from "express";
import { UserController } from "../controller/userContoller";
import {authenticateToken} from '../middleware/authenticateToken'
import {adminToken} from '../middleware/adminToken'

const userRoute = Router()
const userController = new UserController();

userRoute.get('/get-userDetails',authenticateToken, userController.getUserController.bind(userController));
userRoute.post('/add-employment',authenticateToken, userController.addEmploymentController.bind(userController));
userRoute.post('/add-education',authenticateToken, userController.addEducationController.bind(userController));
userRoute.post('/add-skills',authenticateToken, userController.addSkillsController.bind(userController));
userRoute.post('/add-resume', userController.addResumeController.bind(userController));
userRoute.post('/add-profile-image', userController.addProfileImageController.bind(userController));
userRoute.post('/delete-resume',authenticateToken, userController.addDeleteResumeController.bind(userController));
userRoute.post('/start-payment', userController.startPaymentController.bind(userController));
userRoute.post('/paymentSuccess', userController.successPaymentController.bind(userController));
userRoute.post('/saveJob',authenticateToken, userController.saveJobController.bind(userController));
userRoute.post('/applyJob',authenticateToken, userController.applyJobController.bind(userController));
userRoute.put('/unsave-job',authenticateToken, userController.unsaveJobController.bind(userController));
userRoute.get('/subscriberList', adminToken,userController.subscriberList.bind(userController));
userRoute.delete('/removeEmployment', authenticateToken,userController.removeEmployment.bind(userController));
userRoute.delete('/removeEducation', authenticateToken,userController.removeEducation.bind(userController));
userRoute.delete('/removeSkill', authenticateToken,userController.removeSkill.bind(userController));
userRoute.post('/addPreferredJob',authenticateToken, userController.addPreferredJob.bind(userController));



export default userRoute