import { Request, Response, NextFunction } from "express";
import { UserService } from "../../app/useCases/user/user";
import { User } from "../../domain/entities/user";

export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    async userSignupController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user: User | undefined = await this.userService.createUser(req.body);
            if (user) {
                res.status(200).send({ user, success: true });
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
            await this.userService.resendOTP(userDetail as User)
        } catch (error) {
            next(error)
        }
    }

    async verifyOtpController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.body)
            const { email } = req.body
            const otp = req.body.otp
            const userOtp = Number(otp.join(''))
            const verifiedUser =await this.userService.verifyOtp(userOtp, email)
            if(verifiedUser){
                res.status(200).send({ verifiedUser, success: true });
            }
        } catch (error) {
            next(error)
        }
    }



}