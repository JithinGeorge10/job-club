import { Request, Response, NextFunction } from "express";
import { UserService } from "../../app/useCases/user/user";

import { JwtService } from '../../infrastructure/service/jwtService'
import { User } from "../../domain/entities/user";


export class UserController {
    private userService: UserService;
    private JwtService: JwtService;

    constructor() {
        this.userService = new UserService();
        this.JwtService = new JwtService();
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
            const { email } = req.body
            
            const otp = req.body.otp
            const userOtp = Number(otp.join(''))
            const verifiedUser = await this.userService.verifyOtp(userOtp, email)
            if (verifiedUser) {

                const userJwtToken = await this.JwtService.createJwt(verifiedUser._id, 'user')

                res.status(200).cookie('userToken', userJwtToken, {
                    maxAge: 60 * 60 * 24 * 1000
                }).send({ verifiedUser, success: true, token: userJwtToken });
            }
        } catch (error) {
            next(error)
        }
    }

    async userLoginController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body
            const user = await this.userService.userLogin(email, password)
            
            if (user) {
                const userJwtToken = await this.JwtService.createJwt(user._id, 'user')

                res.status(200).cookie('userToken', userJwtToken, {
                    maxAge: 60 * 60 * 24 * 1000
                }).send({ user, success: true, token: userJwtToken });
            }
        } catch (error) {
            next(error)
        }
    }

    
    async changePasswordController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const changedPassword = await this.userService.changePassword(req.body)
            res.status(200).send({ changedPassword })
        } catch (error) {
            next(error)
        }
    }
    async getUserController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const userDetails = await this.userService.userDetails()
            res.status(200).send({ userDetails })
        } catch (error) {
            next(error)
        }
    }

    
    async blockUserController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           const blockUser = await this.userService.blockUser(req.body)
           res.send({ blockUser, success: true })
        } catch (error) {
            next(error)
        }
    }
    async unBlockUserController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           const unblockUser = await this.userService.unblockUser(req.body)
           res.send({ unblockUser, success: true })
        } catch (error) {
            next(error)
        }
    }
    
}