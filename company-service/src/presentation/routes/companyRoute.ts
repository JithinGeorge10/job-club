import { Router } from "express";
import { CompanyController } from "../controller/companyController";

const companyRoute = Router()
const companyController = new CompanyController();

companyRoute.post('/post-job', companyController.postJobController.bind(companyController));
companyRoute.get('/get-jobDetails', companyController.getJobController.bind(companyController));
companyRoute.get('/get-singleJobDetails', companyController.getsingleJobDetails.bind(companyController));
companyRoute.post('/submitApplication', companyController.submitApplication.bind(companyController));


export default companyRoute