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
            console.log(user);
            if (user) {
                res.status(200).send({ user, success: true });
            }
        } catch (error) {
            next(error)
        }
    }

    async resendOtpController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userData } = req.body
            const decodedEmail = decodeURIComponent(userData);
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
            const otp=req.body
            const userOtp=Number(otp.join(''))
            console.log(userOtp);
            
        } catch (error) {
            next(error)
        }
    }



}