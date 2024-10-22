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
   
             const userDetails = await this.companyService.addJob(req.body)
            // console.log(userDetails);

            // res.status(200).send({ userDetails })
        } catch (error) {
            next(error)
        }
    }
      

}