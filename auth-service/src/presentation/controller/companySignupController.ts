import { Request, Response, NextFunction } from "express";
import { CompanyService } from "../../app/useCases/company/company";
import { Company } from "../../domain/entities/company";
export class CompanyController{
    private companyService: CompanyService;
    constructor() {
        this.companyService=new CompanyService()
    }
    async companyRegisterController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             const company: Company | undefined = await this.companyService.createCompany(req.body);
        } catch (error) {
            next(error)
        }
    }
}