import { Request, Response, NextFunction } from "express";
import { CompanyService } from "../../app/useCases/company/company";
import { Company } from "../../domain/entities/company";
import { JwtService } from '../../infrastructure/service/jwtService'
export class CompanyController {
    private companyService: CompanyService;
    private JwtService: JwtService;
    constructor() {
        this.companyService = new CompanyService()
        this.JwtService = new JwtService();
    }

    async companyRegisterController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const company: Company | undefined = await this.companyService.createCompany(req.body);
            if (company) {
                res.status(200).send({ company, success: true });
            }
        } catch (error) {
            next(error)
        }
    }

    async verifyOtpController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body
            console.log('company ooo');
            console.log(req.body);
            const otp = req.body.otp
            const userOtp = Number(otp.join(''))
            const verifiedCompany = await this.companyService.verifyOtp(userOtp, email)
            if (verifiedCompany) {

                const comapanyJwtToken = await this.JwtService.createJwt(verifiedCompany._id, 'company')
                console.log(comapanyJwtToken);

                res.status(200).cookie('companyToken', comapanyJwtToken, {
                    maxAge: 60 * 60 * 24 * 1000
                }).send({ verifiedCompany, success: true, token: comapanyJwtToken });
            }
        } catch (error) {
            next(error)
        }
    }


    async resendOtpController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body
            const decodedEmail = decodeURIComponent(email);
            const userDetail = {
                email: decodedEmail
            }
            await this.companyService.resendOTP(userDetail as Company)
        } catch (error) {
            next(error)
        }
    }


    async companyLoginController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.body);
            const { email, password } = req.body
            const company = await this.companyService.companyLogin(email, password)
            console.log('gotcha2', company);

            if (company) {

                const comapanyJwtToken = await this.JwtService.createJwt(company._id, 'company')
                console.log(comapanyJwtToken);

                res.status(200).cookie('companyToken', comapanyJwtToken, {
                    maxAge: 60 * 60 * 24 * 1000
                }).send({ company, success: true, token: comapanyJwtToken });
            }
        } catch (error) {
            next(error)
        }
    }
    async companyDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const companyDetails = await this.companyService.getCompanyDetails()
                res.send({ companyDetails, success: true })
        } catch (error) {
            next(error)
        }
    }
    async blockCompanyController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           console.log(req.body)
           const blockCompany = await this.companyService.blockCompany(req.body)
           res.send({ blockCompany, success: true })
        } catch (error) {
            next(error)
        }
    }
    async unBlockCompanyController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           console.log(req.body)
           const unBlockCompany = await this.companyService.unBlockCompany(req.body)
           res.send({ unBlockCompany, success: true })
        } catch (error) {
            next(error)
        }
    }
    
    
}