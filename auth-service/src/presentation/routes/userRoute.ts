import { Router } from "express";
import { UserController} from "../controller/userSignupController";

const userRoute = Router()
const userController = new UserController();

userRoute.post('/user-signup', userController.userSignupController.bind(userController));
userRoute.post('/resend-otp', userController.resendOtpController.bind(userController));
userRoute.post('/verify-otp', userController.verifyOtpController.bind(userController));
userRoute.post('/user-login', userController.userLoginController.bind(userController));
userRoute.post('/changePassword', userController.changePasswordController.bind(userController));
userRoute.get('/get-userDetails', userController.getUserController.bind(userController));
userRoute.post('/block-user', userController.blockUserController.bind(userController));
userRoute.post('/unBlock-user', userController.unBlockUserController.bind(userController));



export default userRoute