import { Company } from "../../domain/entities/company";
import jobModel from "./model/jobModel";
class CompanyRepository {
    async addJob(JobData: Company) {
        try {
            console.log('reached repo');
            
            console.log(JobData);
            
            // const newJob = new jobModel(JobData);
            // console.log(newJob);
            // await newJob.save()
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
const jobRepository = new CompanyRepository();

export default jobRepository;