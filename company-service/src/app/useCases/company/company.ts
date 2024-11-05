
import jobRepository from '../../../infrastructure/database/mongooseJobRespository'
export class CompanyService {
    async addJob(jobData: any) {
        try {
            console.log('reached service');
            console.log('service' + jobData);

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

    async getSingleJobDetails(jobId:any) {
        try {
            const jobs = await jobRepository.singleJobDetails(jobId)
            return jobs
        } catch (error) {
            throw error
        }
    }

    async submitApplication(application:any) {
        try {
            const submitApplication = await jobRepository.submitApplication(application)
            return submitApplication
        } catch (error) {
            throw error
        }
    }
    
    async changeStatus(closeJob:any) {
        try {
            const changeStatus = await jobRepository.changeStatus(closeJob)
            return changeStatus
        } catch (error) {
            throw error
        }
    }
    async filteredJobs(filter:any) {
        try {
            const filteredJobs = await jobRepository.filterJobs(filter)
            return filteredJobs
        } catch (error) {
            throw error
        }
    }

    
    
    
    
    
}