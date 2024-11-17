import { Request, Response, NextFunction } from "express";
import { UserService } from '../../app/useCases/User/getUser'
interface AuthenticatedRequest extends Request {
    user?: {
        user: string;
        role: string;
        iat: number;
        exp: number;
    };
}
export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    async getUserController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.query;
            const userIdFromToken = req.user?.user;
            if (!id || typeof id !== 'string') {
                res.status(200).send({ success:false,message: 'Invalid or missing user ID in request' });
            }
            if (id !== userIdFromToken) {
                res.status(200).send({ success:false,message: 'Unauthorized: User ID does not match' });
            }
            const userDetails = await this.userService.getUserDetails(id);
            res.status(200).send({success:true, userDetails });
        } catch (error) {
            next(error);
        }
    }
    
    async addEmploymentController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.body);
            const { userId } = req.body;
            const userIdFromToken = req.user?.user;
            if (userId !== userIdFromToken) {
                res.status(200).send({ success:false,message: 'Unauthorized: User ID does not match' });
            }

            const userDetails = await this.userService.addEmployment(req.body)
            res.status(200).send({ userDetails })
        } catch (error) {
            next(error)
        }
    }
    async addEducationController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const userDetails = await this.userService.addEducation(req.body)
            res.status(200).send({ userDetails })
        } catch (error) {
            next(error)
        }
    }
    async addSkillsController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const userDetails = await this.userService.addSkills(req.body)
            res.status(200).send({ userDetails })
        } catch (error) {
            next(error)
        }
    }
    async addResumeController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const userDetails = await this.userService.addResume(req.body)
            res.status(200).send({ userDetails })
        } catch (error) {
            next(error)
        }
    }


    async addProfileImageController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
           
            const addProfileImage = await this.userService.addProfileImage(req.body)
            res.status(200).send({ addProfileImage })
        } catch (error) {
            next(error)
        }
    }
    async addDeleteResumeController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
           
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
            const {userId,jobId}=req.body
          const savedJob = await this.userService.saveJob(userId,jobId)
          res.status(200).send({ savedJob })
        } catch (error) {
            next(error)
        }
    }
    async applyJobController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const {userId,jobId}=req.body
            const applyJob = await this.userService.applyJob(userId,jobId)
            res.status(200).send({ applyJob })
        } catch (error) {
            next(error)
        }
    }
    async unsaveJobController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const {userId,jobId}=req.body
            const unsaveJob = await this.userService.unsaveJob(userId,jobId)
            res.status(200).send({ unsaveJob })
        } catch (error) {
            next(error)
        }
    }
    
}