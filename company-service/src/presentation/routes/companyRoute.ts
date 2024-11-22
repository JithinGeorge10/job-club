import { Router } from "express";
import { CompanyController } from "../controller/companyController";
import {authenticateToken} from '../middleware/authenticateToken'
const companyRoute = Router()
const companyController = new CompanyController();

companyRoute.post('/post-job', companyController.postJobController.bind(companyController));
companyRoute.get('/get-jobDetails',authenticateToken,companyController.getJobController.bind(companyController));
companyRoute.get('/get-singleJobDetails', companyController.getsingleJobDetails.bind(companyController));
companyRoute.post('/submitApplication', companyController.submitApplication.bind(companyController));
companyRoute.post('/changeStatus-jobDetails', companyController.changeStatus.bind(companyController));
companyRoute.post('/get-filteredJobs', companyController.getfilteredJobs.bind(companyController));
companyRoute.put('/update-jobDetails', companyController.updateJobs.bind(companyController));
companyRoute.delete('/delete-jobDetails', companyController.deleteJobs.bind(companyController));
companyRoute.get('/applicants', companyController.applicants.bind(companyController));
companyRoute.patch('/changeStatus-Applicant', companyController.changeStatusApplicant.bind(companyController));
companyRoute.get('/hiredCompanies', companyController.hiredCompanies.bind(companyController));
companyRoute.get('/rejectedCompanies', companyController.rejectedCompanies.bind(companyController));
companyRoute.get('/inreviewCompanies', companyController.inreviewCompanies.bind(companyController));
companyRoute.get('/interviewCompanies', companyController.interviewCompanies.bind(companyController));
companyRoute.get('/companyDetails', companyController.companyDetails.bind(companyController));
companyRoute.post('/companyLogo', companyController.companyLogo.bind(companyController));



export default companyRoute