import { Request, Response, NextFunction } from "express";
import { AdminService } from "../../app/useCases/admin/admin";
export class AdminController {
    private adminService: AdminService;
    constructor() {
        this.adminService = new AdminService()
    }
    async adminLoginController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body
            const admin = await this.adminService.adminVerify(email, password)
            if (admin) {
                res.status(200).send({ success: true });
            } else {
                res.status(200).send({ success: false });
            }
        } catch (error) {
            next(error)
        }
    }
}