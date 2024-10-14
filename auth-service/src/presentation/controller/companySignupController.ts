import { Request, Response, NextFunction } from "express";
import { CompanyService } from "../../app/useCases/company/company";
import { Company } from "../../domain/entities/company";
import { UserJwtService } from '../../infrastructure/service/jwtService'
export class CompanyController{
    private companyService: CompanyService;
    private userJwtService: UserJwtService;
    constructor() {
        this.companyService=new CompanyService()
        this.userJwtService = new UserJwtService();
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
            const verifiedUser = await this.companyService.verifyOtp(userOtp, email)
            if (verifiedUser) {

                const userJwtToken = await this.userJwtService.createJwt(verifiedUser._id, 'user')
                console.log(userJwtToken);

                res.status(200).cookie('userToken', userJwtToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 1000
                }).send({ verifiedUser, success: true, token: userJwtToken });
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
}