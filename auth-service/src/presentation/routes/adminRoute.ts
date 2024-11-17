import{AdminController} from '../controller/adminController'
import {authenticateToken} from '../middleware/authenticateToken'
import { Router } from "express";
const adminController=new AdminController()
const companyRoute = Router()

companyRoute.post('/admin-login', adminController.adminLoginController.bind(adminController));

export default companyRoute