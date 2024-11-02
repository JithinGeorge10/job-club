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
            const userDetails = await this.userService.addResume(req.body)
            res.status(200).send({ userDetails })
        } catch (error) {
            next(error)
        }
    }


    async addProfileImageController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log('reached controller');
            console.log(req.body);
            const addProfileImage = await this.userService.addProfileImage(req.body)
            res.status(200).send({ addProfileImage })
        } catch (error) {
            next(error)
        }
    }
    async addDeleteResumeController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log('reached controller');
            console.log(req.body);
            const deleteResume = await this.userService.deleteResume(req.body)
            res.status(200).send({ deleteResume })
        } catch (error) {
            next(error)
        }
    }
    async startPaymentController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const paymentStarted = await this.userService.startPayment(req.body)
            res.status(200).send({ paymentStarted })
        } catch (error) {
            next(error)
        }
    }
    async successPaymentController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const paymentStarted = await this.userService.successPayment(req.body)
            res.status(200).send({ paymentStarted })
        } catch (error) {
            next(error)
        }
    }
    async saveJobController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.body);
            const {userId,jobId}=req.body
          const savedJob = await this.userService.saveJob(userId,jobId)
          res.status(200).send({ savedJob })
        } catch (error) {
            next(error)
        }
    }
    async applyJobController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.body);
            const {userId,jobId}=req.body
            const applyJob = await this.userService.applyJob(userId,jobId)
            res.status(200).send({ applyJob })
        } catch (error) {
            next(error)
        }
    }
    async unsaveJobController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.body);
            const {userId,jobId}=req.body
            const unsaveJob = await this.userService.unsaveJob(userId,jobId)
            res.status(200).send({ unsaveJob })
        } catch (error) {
            next(error)
        }
    }
    
}