import { Request, Response, NextFunction } from "express";
import { UserService  } from "../../app/useCases/user/user";

export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    async userSignupController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user: string | undefined = await this.userService.createUser(req.body); 
            res.status(200).send({ user, success: true });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}



