import { Request, Response, NextFunction } from "express";
import { AdminService } from "../../app/useCases/admin/admin";
import { JwtService } from '../../infrastructure/service/jwtService'
import {ADMIN_MAIL} from '../../utils/constants'
export class AdminController {
    private adminService: AdminService;
    private JwtService: JwtService;

    constructor() {
        this.adminService = new AdminService()
        this.JwtService = new JwtService();
    }
    async adminLoginController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { email, password } = req.body
            const admin = await this.adminService.adminVerify(email, password)
            if (admin) {
                const adminJwtToken = await this.JwtService.createAccessToken(ADMIN_MAIL, 'admin')
                const adminRefresh = await this.JwtService.createRefreshToken(ADMIN_MAIL, 'admin')

                res
                .status(200)
                .cookie('adminAccessToken', adminJwtToken, {
                    httpOnly: false,
                })
                .cookie('adminRefreshToken', adminRefresh, {
                    httpOnly: true,
                }).send({ success: true, token: adminJwtToken });



                
                
            } else {
                res.status(200).send({ success: false });
            }
        } catch (error) {
            next(error)
        }
    }
}