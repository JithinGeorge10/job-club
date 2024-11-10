import mongoose from "mongoose";
import jobModel from "./model/jobModel";
class CompanyRepository {
    async addJob(JobData: any) {
        try {
            console.log('reached repo');
            console.log(JobData);

            const { data, companyId } = JobData;


            const minSalary = parseInt(data.minSalary, 10);
            const maxSalary = parseInt(data.maxSalary, 10);


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
                skills: data.skills
            });


            const savedJob = await newJob.save();
            console.log('Job successfully added:', savedJob);

            return savedJob;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getJob() {
        try {
            const jobDetails = await jobModel.find().populate('companyId');
            return jobDetails

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async singleJobDetails(jobId: any) {
        try {
            const jobDetails = await jobModel.find({ _id: jobId }).populate('companyId');
            return jobDetails
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async submitApplication(application: any) {
        try {
            console.log(application)

            // return jobDetails
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async changeStatus(job: any) {
        try {

            const statusChanges = await jobModel.updateOne(
                { _id: job.jobId },
                { $set: { status: false } }
            );

            return statusChanges;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async filterJobs(filter: any) {
        try {
            const { salaryRanges, categories, employmentTypes } = filter;


            const salaryFilter = salaryRanges.map((range: string) => {
                const [min, max] = range.split('-').map(Number);
                return {
                    $or: [
                        { minSalary: { $gte: min, $lte: max } },
                        { maxSalary: { $gte: min, $lte: max } },
                        { minSalary: { $lte: min }, maxSalary: { $gte: max } }
                    ]
                };
            });


            const filterQuery = {
                ...(salaryFilter.length > 0 && { $or: salaryFilter }),
                ...(categories.length > 0 && { category: { $in: categories } }),
                ...(employmentTypes.length > 0 && { employmentType: { $in: employmentTypes } }),
            };


            const jobs = await jobModel.find(filterQuery).populate('companyId', 'companyName'); // Add populate here

            console.log('Filtered Jobs:', jobs);
            return jobs;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async editJob(JobDetails: any) {
        try {
            
            const { _id: jobId, ...updateFields } = JobDetails;   
            const updatedJob = await jobModel.findByIdAndUpdate(
                jobId,
                { $set: updateFields },
                { new: true, runValidators: true } 
            );
    
            if (!updatedJob) {
                console.log('Job not found');
                return { success: false, message: 'Job not found' };
            }
    
            console.log('Job updated successfully:', updatedJob);
            return { success: true, data: updatedJob };
        } catch (error) {
            console.log('Error updating job:', error);
            throw error;
        }
    }

    
    async deleteJob(jobId:any) {
        try {
          const result = await jobModel.findByIdAndDelete(jobId);
          if (result) {
            console.log("Job deleted successfully:", result);
            return { success: true, message: "Job deleted successfully" };
          } else {
            console.log("Job not found");
            return { success: false, message: "Job not found" };
          }
        } catch (error) {
          console.error("Error deleting job:", error);
          return { success: false, message: "Error deleting job" };
        }
      };
      
}

const jobRepository = new CompanyRepository();

export default jobRepository;