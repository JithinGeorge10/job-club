import { Router } from "express";
import{CompanyController} from '../controller/companySignupController'

const companyRoute = Router()
const companyController=new CompanyController()

companyRoute.post('/company-register', companyController.companyRegisterController.bind(companyController));
companyRoute.post('/company-verify-otp', companyController.verifyOtpController.bind(companyController));
companyRoute.post('/company-resend-otp', companyController.resendOtpController.bind(companyController));
companyRoute.post('/company-login', companyController.companyLoginController.bind(companyController));


export default companyRoute