import { Router } from "express";
import { UserController} from "../controller/userSignupController";

const userSignupRoute = Router()
const userController = new UserController();

userSignupRoute.post('/user-signup', userController.userSignupController.bind(userController));
userSignupRoute.post('/resend-otp', userController.resendOtpController.bind(userController));

 
export default userSignupRoute