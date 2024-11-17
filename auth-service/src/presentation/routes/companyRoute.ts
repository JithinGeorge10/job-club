import { Router } from "express";
import{CompanyController} from '../controller/companySignupController'
import {authenticateToken} from '../middleware/authenticateToken'

const companyRoute = Router()
const companyController=new CompanyController()

companyRoute.post('/company-register', companyController.companyRegisterController.bind(companyController));
companyRoute.post('/company-verify-otp', companyController.verifyOtpController.bind(companyController));
companyRoute.post('/company-resend-otp', companyController.resendOtpController.bind(companyController));
companyRoute.post('/company-login', companyController.companyLoginController.bind(companyController));
companyRoute.get('/get-companyDetails', authenticateToken,companyController.companyDetailsController.bind(companyController));
companyRoute.post('/block-company', companyController.blockCompanyController.bind(companyController));
companyRoute.post('/unblock-company', companyController.unBlockCompanyController.bind(companyController));


export default companyRoute