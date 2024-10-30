
import jobRepository from '../../../infrastructure/database/mongooseJobRespository'
export class CompanyService {
    async addJob(jobData: any) {
        try {
            console.log('reached service');
            console.log('service' + jobData);

            const company = await jobRepository.addJob(jobData)

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


    
    
}