import { Request, Response, NextFunction } from "express";
import { AdminService } from "../../app/useCases/admin/admin";
import { JwtService } from '../../infrastructure/service/jwtService'

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
                const adminJwtToken = await this.JwtService.createJwt('admin@gmail.com', 'admin')
                console.log(adminJwtToken);
                res.status(200).cookie('adminToken', adminJwtToken, {
                    maxAge: 60 * 60 * 24 * 1000
                }).send({ success: true, token: adminJwtToken });
            } else {
                res.status(200).send({ success: false });
            }
        } catch (error) {
            next(error)
        }
    }
}