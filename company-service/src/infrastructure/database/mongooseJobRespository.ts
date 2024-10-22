import { Job } from "../../domain/entities/company";
import jobModel from "./model/jobModel";
class CompanyRepository {
    async addJob(JobData: any) {
        try {
            console.log('reached repo');
            console.log(JobData);

            const { data, companyId } = JobData;

        // Convert salaries to numbers if they're passed as strings
        const minSalary = parseInt(data.minSalary, 10);
        const maxSalary = parseInt(data.maxSalary, 10);

        // Create a new job object to save in the database
        const newJob = new jobModel({
            companyId,
            jobTitle: data.jobTitle,
            employmentType: data.employmentType,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            minSalary,
            maxSalary,
            category: data.category,
            slots: parseInt(data.slots, 10),
            jobDescription: data.jobDescription,
            qualification: data.qualification,
            jobResponsibilities: data.jobResponsibilities,
            requirements: data.requirements,
            skills: data.skills // Assuming skills already follow the expected object structure
        });

        // Save the new job document to the database
        const savedJob = await newJob.save();
        console.log('Job successfully added:', savedJob);

        return savedJob;
           
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
const jobRepository = new CompanyRepository();

export default jobRepository;