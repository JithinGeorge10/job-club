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
            const userIdFromToken = req.user?.user;
            if (userIdFromToken) {
                const userDetails = await this.userService.getUserDetails(userIdFromToken);
                console.log(userDetails)
                res.status(200).send({ success: true, userDetails });
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required.');
            }
        } catch (error) {
            next(error);
        }
    }

    async addEmploymentController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const userIdFromToken = req.user?.user;
            if (userIdFromToken) {
                const userDetails = await this.userService.addEmployment(req.body, userIdFromToken)
                res.status(200).send({ userDetails })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required.');
            }

        } catch (error) {
            next(error)
        }
    }
    async addEducationController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const userIdFromToken = req.user?.user;
            if (userIdFromToken) {
                const userDetails = await this.userService.addEducation(req.body, userIdFromToken)
                res.status(200).send({ userDetails })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required.');
            }

        } catch (error) {
            next(error)
        }
    }
    async addSkillsController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const userIdFromToken = req.user?.user;
            if (userIdFromToken) {
                const userDetails = await this.userService.addSkills(req.body, userIdFromToken)
                res.status(200).send({ userDetails })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required.');
            }

        } catch (error) {
            next(error)
        }
    }
    async addResumeController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {


            const userDetails = await this.userService.addResume(req.body)
            res.status(200).send({ userDetails })


        } catch (error) {
            next(error)
        }
    }


    async addProfileImageController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const { userId } = req.body;
            const addProfileImage = await this.userService.addProfileImage(req.body)
            res.status(200).send({ addProfileImage })
        } catch (error) {
            next(error)
        }
    }
    async addDeleteResumeController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {

            const userIdFromToken = req.user?.user;
            if (userIdFromToken) {
                const deleteResume = await this.userService.deleteResume(userIdFromToken)
                res.status(200).send({ deleteResume })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required.');
            }

        } catch (error) {
            next(error)
        }
    }
    async startPaymentController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.body)
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
    async saveJobController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const { jobId } = req.body
            const userIdFromToken = req.user?.user;
            if (userIdFromToken) {
                const savedJob = await this.userService.saveJob(userIdFromToken, jobId)
                res.status(200).send({ savedJob })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required.');
            }

        } catch (error) {
            next(error)
        }
    }
    async applyJobController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const { userId, jobId } = req.body
            const userIdFromToken = req.user?.user;
            if (userIdFromToken) {
                const applyJob = await this.userService.applyJob(userIdFromToken, jobId)
                res.status(200).send({ applyJob })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required.');
            }

        } catch (error) {
            next(error)
        }
    }
    async unsaveJobController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const { jobId } = req.body
            const userIdFromToken = req.user?.user;
            if (userIdFromToken) {
                const unsaveJob = await this.userService.unsaveJob(userIdFromToken, jobId)
                res.status(200).send({ unsaveJob })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required.');
            }
        } catch (error) {
            next(error)
        }
    }
    async removeEmployment(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.body)
            const { employmentId } = req.body
            const userIdFromToken = req.user?.user;
            if (userIdFromToken) {
                const removeEmployment = await this.userService.removeEmployment(userIdFromToken, employmentId)
                res.status(200).send({ removeEmployment })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required.');
            }
        } catch (error) {
            next(error)
        }
    }
    async removeEducation(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.body)
            const { educationId } = req.body
            const userIdFromToken = req.user?.user;
            if (userIdFromToken) {
                const removeEducation = await this.userService.removeEducation(userIdFromToken, educationId)
                res.status(200).send({ removeEducation })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required.');
            }
        } catch (error) {
            next(error)
        }
    }
    async removeSkill(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
      
            const { skill } = req.body
            const userIdFromToken = req.user?.user;
            if (userIdFromToken) {
                const removeSkill = await this.userService.removeSkill(userIdFromToken, skill)
                res.status(200).send({ removeSkill })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required.');
            }
        } catch (error) {
            next(error)
        }
    }
    
    
    async subscriberList(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.user)
            if (req.user) {
                const subscriberList = await this.userService.subscriberList()
                res.status(200).send({ subscriberList })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required.');
            }

        } catch (error) {
            next(error)
        }
    }

}