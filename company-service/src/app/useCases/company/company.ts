
import jobRepository from '../../../infrastructure/database/mongooseJobRespository'
import companyRepository from '../../../infrastructure/database/mongooseCompanyRepository'
export class CompanyService {
    async addJob(jobData: any) {
        try {
            const company = await jobRepository.addJob(jobData)
            return company
        } catch (error) {
            throw error
        }
    }

    async getJobDetails() {
        try {

            const jobs = await jobRepository.getJob()
            return jobs
        } catch (error) {
            throw error
        }
    }

    async getSingleJobDetails(jobId: any) {
        try {
            const jobs = await jobRepository.singleJobDetails(jobId)
            return jobs
        } catch (error) {
            throw error
        }
    }

    async submitApplication(application: any) {
        try {
            const submitApplication = await jobRepository.submitApplication(application)
            return submitApplication
        } catch (error) {
            throw error
        }
    }

    async changeStatus(closeJob: any) {
        try {
            const changeStatus = await jobRepository.changeStatus(closeJob)
            return changeStatus
        } catch (error) {
            throw error
        }
    }
    async filteredJobs(filter: any) {
        try {
            const filteredJobs = await jobRepository.filterJobs(filter)
            return filteredJobs
        } catch (error) {
            throw error
        }
    }

    async editJob(jobDetails: any) {
        try {
            const updatedJob = await jobRepository.editJob(jobDetails)
            return updatedJob
        } catch (error) {
            throw error
        }
    }
    async deleteJob(jobId: any) {
        try {
            const deleteJob = await jobRepository.deleteJob(jobId)
            return deleteJob
        } catch (error) {
            throw error
        }
    }
    async applicants(companyId:any) {
        try {
            const applicants = await jobRepository.applicants(companyId)
            return applicants
        } catch (error) {
            throw error
        }
    }
    async changeStatusApplicants(applicantId:any,status:any) {
        try {
            const applicants = await jobRepository.changeStatusApplicants(applicantId,status)
            return applicants
        } catch (error) {
            throw error
        }
    }
    async hiredCompanies(userId:any) {
        try {
            const hiredCompanies = await jobRepository.hiredCompanies(userId)
            return hiredCompanies
        } catch (error) {
            throw error
        }
    }
    async rejectedCompanies(userId:any) {
        try {
            const rejectedCompanies = await jobRepository.rejectedCompanies(userId)
            return rejectedCompanies
        } catch (error) {
            throw error
        }
    }
    async inreviewCompanies(userId:any) {
        try {
            const inreviewCompanies = await jobRepository.inreviewCompanies(userId)
            return inreviewCompanies
        } catch (error) {
            throw error
        }
    }
    
    async interviewCompanies(userId:any) {
        try {
            const interviewCompanies = await jobRepository.interviewCompanies(userId)
            return interviewCompanies
        } catch (error) {
            throw error
        }
    }
    async companyDetails(companyId:any) {
        try {
            const companyDetails = await jobRepository.companyDetails(companyId)
            return companyDetails
        } catch (error) {
            throw error
        }
    }
    
    async addProfileImage(companyDetails: any) {
        try {
            const profileImage = await companyRepository.addProfileImage(companyDetails)
            return profileImage
        } catch (error) {
            throw error
        }
    }
    
    async applicantDetails(applicantId: any) {
        try {
            const applicantDetails = await jobRepository.applicantDetails(applicantId)
            return applicantDetails
        } catch (error) {
            throw error
        }
    }
    
    
}