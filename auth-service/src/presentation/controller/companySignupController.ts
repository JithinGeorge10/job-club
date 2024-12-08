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
            const otp = req.body.otp
            const userOtp = Number(otp.join(''))
            const verifiedCompany = await this.companyService.verifyOtp(userOtp, email)
            if (verifiedCompany) {

                const companyJwtToken = await this.JwtService.createAccessToken(verifiedCompany._id, 'company')
                const companyRefresh = await this.JwtService.createRefreshToken(verifiedCompany._id, 'company')
                res
                    .status(200)
                    .cookie('companyAccessToken', companyJwtToken, {
                        httpOnly: false,
                    })
                    .cookie('companyRefreshToken', companyRefresh, {
                        httpOnly: true,
                    }).send({ verifiedCompany, success: true, token: companyJwtToken });
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
            const { email, password } = req.body;
            const company = await this.companyService.companyLogin(email, password);

            if (company && '_id' in company) {
                const companyJwtToken = await this.JwtService.createAccessToken(company._id, 'company');
                const companyRefresh = await this.JwtService.createRefreshToken(company._id, 'company')
                res
                    .status(200)
                    .cookie('companyAccessToken', companyJwtToken, {
                        httpOnly: false,
                    })
                    .cookie('companyRefreshToken', companyRefresh, {
                        httpOnly: true,
                    }).send({ company, success: true, token: companyJwtToken });

            } else if (company && 'isBlocked' in company && company.isBlocked) {
                res.status(403).send({ success: false, message: 'Company is blocked' });
            } else {
                res.status(401).send({ success: false, message: 'Invalid credentials' });
            }
        } catch (error) {
            next(error);
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
            const blockCompany = await this.companyService.blockCompany(req.body)
            res.send({ blockCompany, success: true })
        } catch (error) {
            next(error)
        }
    }
    async unBlockCompanyController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const unBlockCompany = await this.companyService.unBlockCompany(req.body)
            res.send({ unBlockCompany, success: true })
        } catch (error) {
            next(error)
        }
    }


}