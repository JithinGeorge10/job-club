import { Request, Response, NextFunction } from "express";
// import { UserService } from '../../app/useCases/User/addUser'
import { UserService } from '../../app/useCases/User/getUser'
export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    async getUserController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.query.id);
            const { id } = req.query
            const userDetails = await this.userService.getUserDetails(id)
            console.log(userDetails);

            res.status(200).send({ userDetails })
        } catch (error) {
            next(error)
        }
    }
}