import { Request, Response, NextFunction } from "express";

import { CompanyService } from '../../app/useCases/company/company'
export class CompanyController {
    private companyService: CompanyService;
    constructor() {
        this.companyService = new CompanyService();
    }
    async postJobController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.body);

            const jobDetails = await this.companyService.addJob(req.body)
            // console.log(jobDetails);

             res.status(200).send({ jobDetails })
        } catch (error) {
            next(error)
        }
    }

    async getJobController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            console.log('reached get job');

            const jobDetails = await this.companyService.getJobDetails()
            // console.log(userDetails);

            res.status(200).send({ jobDetails })
        } catch (error) {
            next(error)
        }
    }
    async getsingleJobDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {jobId}=req.query
            const jobDetails = await this.companyService.getSingleJobDetails(jobId)
            console.log(jobDetails);
            
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
    


}