import { Request, Response, NextFunction } from "express";

import { CompanyService } from '../../app/useCases/company/company'
export class CompanyController {
    private companyService: CompanyService;
    constructor() {
        this.companyService = new CompanyService();
    }
    async postJobController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const jobDetails = await this.companyService.addJob(req.body)
            res.status(200).send({ jobDetails })
        } catch (error) {
            next(error)
        }
    }

    async getJobController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {


            const jobDetails = await this.companyService.getJobDetails()

            res.status(200).send({ jobDetails })
        } catch (error) {
            next(error)
        }
    }
    async getsingleJobDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { jobId } = req.query
            const jobDetails = await this.companyService.getSingleJobDetails(jobId)

            res.status(200).send({ jobDetails })
        } catch (error) {
            next(error)
        }
    }
    async submitApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const submitApplication = await this.companyService.submitApplication(req.body)
            res.status(200).send({ submitApplication })
        } catch (error) {
            next(error)
        }
    }
    async changeStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const changeStatus = await this.companyService.changeStatus(req.body)
            res.status(200).send({ changeStatus })
        } catch (error) {
            next(error)
        }
    }
    async getfilteredJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const filteredJobs = await this.companyService.filteredJobs(req.body)
            res.status(200).send({ filteredJobs })
        } catch (error) {
            next(error)
        }
    }
    async updateJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const updatedJob = await this.companyService.editJob(req.body)
            res.status(200).send({ updatedJob })
        } catch (error) {
            next(error)
        }
    }
    async deleteJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { jobId } = req.body
            const deleteJob = await this.companyService.deleteJob(jobId)
        } catch (error) {
            next(error)
        }
    }

    async applicants(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { companyId } = req.query
            const applicants = await this.companyService.applicants(companyId)
            res.status(200).send({ applicants })
        } catch (error) {
            next(error)
        }
    }

    async changeStatusApplicant(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { applicantId, status } = req.body
            const applicants = await this.companyService.changeStatusApplicants(applicantId, status)
            res.status(200).send({ applicants })
        } catch (error) {
            next(error)
        }
    }

    async hiredCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.query;
            const hiredCompanies = await this.companyService.hiredCompanies(id)
            res.status(200).send({ hiredCompanies })
        } catch (error) {
            next(error)
        }
    }
    async rejectedCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.query;
            const rejectedCompanies = await this.companyService.rejectedCompanies(id)
            res.status(200).send({ rejectedCompanies })
        } catch (error) {
            next(error)
        }
    }
    async inreviewCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.query;
            const inreviewCompanies = await this.companyService.inreviewCompanies(id)
            res.status(200).send({ inreviewCompanies })
        } catch (error) {
            next(error)
        }
    }
    async interviewCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.query;
            const interviewCompanies = await this.companyService.interviewCompanies(id)
            res.status(200).send({ interviewCompanies })
        } catch (error) {
            next(error)
        }
    }
    async companyDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.query;
            console.log(id)
            const companyDetails = await this.companyService.companyDetails(id)
            res.status(200).send({ companyDetails })
        } catch (error) {
            next(error)
        }
    }


    
    async companyLogo(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.body)
        //    const { userId } = req.body;
        //    const userIdFromToken = req.user?.user;
        //     if (userId !== userIdFromToken) {
        //         res.status(200).send({ success: false, message: 'Unauthorized: User ID does not match' });
        //     }
            const addProfileImage = await this.companyService.addProfileImage(req.body)
            res.status(200).send({ addProfileImage })
        } catch (error) {
            next(error)
        }
    }

}