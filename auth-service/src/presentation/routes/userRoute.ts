import { Router } from "express";
import { UserController} from "../controller/userSignupController";
import{CompanyController} from '../controller/companySignupController'
const userRoute = Router()
const userController = new UserController();
const companyController=new CompanyController()
userRoute.post('/user-signup', userController.userSignupController.bind(userController));
userRoute.post('/resend-otp', userController.resendOtpController.bind(userController));
userRoute.post('/verify-otp', userController.verifyOtpController.bind(userController));
userRoute.post('/user-login', userController.userLoginController.bind(userController));
userRoute.post('/company-register', companyController.companyRegisterController.bind(companyController));



export default userRoute