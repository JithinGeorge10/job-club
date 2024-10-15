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
            console.log('---==',email);
            
            const otp = req.body.otp
            const userOtp = Number(otp.join(''))
            const verifiedUser = await this.userService.verifyOtp(userOtp, email)
            if (verifiedUser) {

                const userJwtToken = await this.JwtService.createJwt(verifiedUser._id, 'user')
                console.log(userJwtToken);

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
            console.log(req.body);
            const { email, password } = req.body
            const user = await this.userService.userLogin(email, password)
            console.log('gotcha2',user);
            
            if (user) {
                console.log('blablabla')
                console.log(user)
                const userJwtToken = await this.JwtService.createJwt(user._id, 'user')
                console.log(userJwtToken);

                res.status(200).cookie('userToken', userJwtToken, {
                    maxAge: 60 * 60 * 24 * 1000
                }).send({ user, success: true, token: userJwtToken });
            }
        } catch (error) {
            next(error)
        }
    }

    
}