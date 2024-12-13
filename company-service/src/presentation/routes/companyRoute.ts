import { Router } from "express";
import { CompanyController } from "../controller/companyController";
import {authenticateToken} from '../middleware/authenticateToken'
const companyRoute = Router()
const companyController = new CompanyController();

companyRoute.post('/post-job', authenticateToken,companyController.postJobController.bind(companyController));
companyRoute.get('/get-jobDetails',authenticateToken,companyController.getJobController.bind(companyController));
companyRoute.get('/get-singleJobDetails',authenticateToken, companyController.getsingleJobDetails.bind(companyController));
companyRoute.post('/submitApplication',authenticateToken, companyController.submitApplication.bind(companyController));
companyRoute.post('/changeStatus-jobDetails',authenticateToken, companyController.changeStatus.bind(companyController));
companyRoute.post('/get-filteredJobs', authenticateToken,companyController.getfilteredJobs.bind(companyController));
companyRoute.put('/update-jobDetails',authenticateToken, companyController.updateJobs.bind(companyController));
companyRoute.delete('/delete-jobDetails',authenticateToken, companyController.deleteJobs.bind(companyController));
companyRoute.get('/applicants', authenticateToken,companyController.applicants.bind(companyController));
companyRoute.patch('/changeStatus-Applicant',authenticateToken, companyController.changeStatusApplicant.bind(companyController));
companyRoute.get('/hiredCompanies', authenticateToken,companyController.hiredCompanies.bind(companyController));
companyRoute.get('/rejectedCompanies',authenticateToken, companyController.rejectedCompanies.bind(companyController));
companyRoute.get('/inreviewCompanies',authenticateToken, companyController.inreviewCompanies.bind(companyController));
companyRoute.get('/interviewCompanies', authenticateToken,companyController.interviewCompanies.bind(companyController));
companyRoute.get('/companyDetails',authenticateToken, companyController.companyDetails.bind(companyController));
companyRoute.post('/companyLogo',authenticateToken, companyController.companyLogo.bind(companyController));
companyRoute.get('/applicantDetails', authenticateToken,companyController.applicantDetails.bind(companyController));
companyRoute.get('/singleJobApplicants', authenticateToken,companyController.singleJobApplicants.bind(companyController));



export default companyRoute