import { Router } from "express";
import { UserController} from "../controller/userSignupController";

const userRoute = Router()
const userController = new UserController();

userRoute.post('/user-signup', userController.userSignupController.bind(userController));
userRoute.post('/resend-otp', userController.resendOtpController.bind(userController));
userRoute.post('/verify-otp', userController.verifyOtpController.bind(userController));
userRoute.post('/user-login', userController.userLoginController.bind(userController));
userRoute.post('/company-register', userController.companyRegisterController.bind(userController));



export default userRoute