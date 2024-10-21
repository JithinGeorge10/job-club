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
    async addEmploymentController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.body);
            const userDetails = await this.userService.addEmployment(req.body)
            res.status(200).send({ userDetails })
        } catch (error) {
            next(error)
        }
    }
    async addEducationController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.body);
            const userDetails = await this.userService.addEducation(req.body)
            res.status(200).send({ userDetails })
        } catch (error) {
            next(error)
        }
    }
    async addSkillsController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.body);
            const userDetails = await this.userService.addSkills(req.body)
            res.status(200).send({ userDetails })
        } catch (error) {
            next(error)
        }
    }
    async addResumeController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.body);
            // const userDetails = await this.userService.addSkills(req.body)
            // res.status(200).send({ userDetails })
        } catch (error) {
            next(error)
        }
    }

    
    

}