import { Request, Response, NextFunction } from "express";

import { CompanyService } from '../../app/useCases/company/company'
interface AuthenticatedRequest extends Request {
    user?: {
        user: string;
        role: string;
    };
}
export class CompanyController {
    private companyService: CompanyService;
    constructor() {
        this.companyService = new CompanyService();
    }
    async postJobController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const jobDetails = await this.companyService.addJob(req.body)
                res.status(200).send({ jobDetails })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required .');
            }
        } catch (error) {
            next(error)
        }
    }

    async getJobController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const jobDetails = await this.companyService.getJobDetails()
                res.status(200).send({ jobDetails })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to fetch doctor profile.');
            }

        } catch (error) {
            next(error)
        }
    }
    async getsingleJobDetails(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const { jobId } = req.query
                const jobDetails = await this.companyService.getSingleJobDetails(jobId)
                res.status(200).send({ jobDetails })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to fetch doctor profile.');
            }
        } catch (error) {
            next(error)
        }
    }
    async submitApplication(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const submitApplication = await this.companyService.submitApplication(req.body)
                res.status(200).send({ submitApplication })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to fetch doctor profile.');
            }
        } catch (error) {
            next(error)
        }
    }
    async changeStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const changeStatus = await this.companyService.changeStatus(req.body)
                res.status(200).send({ changeStatus })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required');
            }
        } catch (error) {
            next(error)
        }
    }
    async getfilteredJobs(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const filteredJobs = await this.companyService.filteredJobs(req.body)
                res.status(200).send({ filteredJobs })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to.');
            }
        } catch (error) {
            next(error)
        }
    }
    async updateJobs(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const updatedJob = await this.companyService.editJob(req.body)
                res.status(200).send({ updatedJob })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to.');
            }
        } catch (error) {
            next(error)
        }
    }
    async deleteJobs(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const { jobId } = req.body
                const deleteJob = await this.companyService.deleteJob(jobId)
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to fetch doctor profile.');
            }
        } catch (error) {
            next(error)
        }
    }

    async applicants(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const { companyId } = req.query
                const applicants = await this.companyService.applicants(companyId)
                res.status(200).send({ applicants })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to fetch doctor profile.');
            }
        } catch (error) {
            next(error)
        }
    }

    async changeStatusApplicant(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const { applicantId, status } = req.body
                const applicants = await this.companyService.changeStatusApplicants(applicantId, status)
                res.status(200).send({ applicants })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to fetch doctor profile.');
            }
        } catch (error) {
            next(error)
        }
    }

    async hiredCompanies(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const { id } = req.query;
                const hiredCompanies = await this.companyService.hiredCompanies(id)
                res.status(200).send({ hiredCompanies })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to fetch doctor profile.');
            }
        } catch (error) {
            next(error)
        }
    }
    async rejectedCompanies(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const { id } = req.query;
                const rejectedCompanies = await this.companyService.rejectedCompanies(id)
                res.status(200).send({ rejectedCompanies })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to fetch doctor profile.');
            }
        } catch (error) {
            next(error)
        }
    }
    async inreviewCompanies(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const { id } = req.query;
                const inreviewCompanies = await this.companyService.inreviewCompanies(id)
                res.status(200).send({ inreviewCompanies })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to fetch doctor profile.');
            }
        } catch (error) {
            next(error)
        }
    }
    async interviewCompanies(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const { id } = req.query;
                const interviewCompanies = await this.companyService.interviewCompanies(id)
                res.status(200).send({ interviewCompanies })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to fetch doctor profile.');
            }
        } catch (error) {
            next(error)
        }
    }
    async companyDetails(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.user
            if (userId) {
                const { id } = req.query;
                console.log(id)
                const companyDetails = await this.companyService.companyDetails(id)
                res.status(200).send({ companyDetails })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to fetch doctor profile.');
            }
        } catch (error) {
            next(error)
        }
    }

    async companyLogo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.user?.user
            if (userId) {
                const addProfileImage = await this.companyService.addProfileImage(req.body)
                res.status(200).send({ addProfileImage })
            } else {
                console.error('User ID not found');
                throw new Error('User ID is required to fetch doctor profile.');
            }
        } catch (error) {
            next(error)
        }
    }

}