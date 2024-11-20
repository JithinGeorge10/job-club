
import jobModel from "./model/jobModel";
import applicantionModel from "./model/applicationModel";
import companyModel from "./model/companyModel";
class CompanyRepository {
    async addJob(JobData: any) {
        try {

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


            return savedJob;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getJob() {
        try {
            const jobDetails = await jobModel.find({ status: true }).populate('companyId');
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
            const { firstName, lastName, email, phone, profile } = application.userDetails;
            const { jobId } = application;


            const job = await jobModel.findById(jobId);
            if (!job) {
                throw new Error('Job not found');
            }

            const applicantData = {
                firstName,
                lastName,
                email,
                phone,
                education_details: profile.education_details || [],
                employment_details: profile.employment_details || [],
                profileImage: profile.profileImage || '',
                skills: profile.skills || [],
                resume: profile.resume || '',
                jobId: job._id,
                companyId: job.companyId
            };

            const newApplicant = new applicantionModel(applicantData);
            const savedApplicant = await newApplicant.save();


            return savedApplicant;

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
                status: true,
            };

            const jobs = await jobModel.find(filterQuery).populate('companyId', 'companyName');

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
                return { success: false, message: 'Job not found' };
            }

            return { success: true, data: updatedJob };
        } catch (error) {
            console.log('Error updating job:', error);
            throw error;
        }
    }


    async deleteJob(jobId: any) {
        try {

            const result = await jobModel.findByIdAndDelete(jobId);
            if (result) {
                return { success: true, message: "Job deleted successfully" };
            } else {
                return { success: false, message: "Job not found" };
            }
        } catch (error) {
            console.error("Error deleting job:", error);
            return { success: false, message: "Error deleting job" };
        }
    };

    async applicants(companyId: any) {
        try {
            console.log(companyId)
            const applicants = await applicantionModel.find({ companyId }).lean();
            console.log(applicants)
            const result = await Promise.all(
                applicants.map(async (applicant) => {
                    const jobDetails = await jobModel.findById(applicant.jobId).lean();
                    return {
                        ...applicant,
                        jobDetails: jobDetails || null,
                    };
                })
            );
            return result;
        } catch (error) {
            console.error(error);
            return { success: false, message: "Error fetching applicants" };
        }
    };


    async changeStatusApplicants(applicantId: any, Status: any) {
        try {
            const result = await applicantionModel.updateOne(
                { _id: applicantId },
                { $set: { Status } }
            );
            return result;
        } catch (error) {
            console.error('Error updating applicant status:', error);
            return { success: false, message: "Error updating applicant status" };
        }
    }


    async hiredCompanies(userId:any) {
        try {
            console.log(userId);
    
            // Fetch hired applicants first
            const hiredApplicants = await applicantionModel.find({
                email: userId,
                Status: 'Hired',
            });
    
            // If no hired applicants found, return an empty array
            if (!hiredApplicants || hiredApplicants.length === 0) {
                return [];
            }
    
           
            const populatePromises = hiredApplicants.map(async (applicant) => {
                const [jobDetails, companyDetails] = await Promise.all([
                    jobModel.findById(applicant.jobId, 'jobTitle'),
                    companyModel.findById(applicant.companyId, 'companyName location'),
                ]);
    
                return {
                    ...applicant.toObject(),
                    jobDetails,
                    companyDetails,
                };
            });
    
  
            const populatedApplicants = await Promise.all(populatePromises);
    
            console.log(populatedApplicants);
            return populatedApplicants;
        } catch (error) {
            console.error('Error fetching hired applicants:', error);
            return { success: false, message: "Error fetching hired applicants" };
        }
    }
    
    async rejectedCompanies(userId:any) {
        try {
            console.log(userId);
    
           
            const RejectedApplicants = await applicantionModel.find({
                email: userId,
                Status: 'Rejected',
            });
    
            
            if (!RejectedApplicants || RejectedApplicants.length === 0) {
                return [];
            }
    
           
            const populatePromises = RejectedApplicants.map(async (applicant) => {
                const [jobDetails, companyDetails] = await Promise.all([
                    jobModel.findById(applicant.jobId, 'jobTitle'),
                    companyModel.findById(applicant.companyId, 'companyName location'),
                ]);
    
                return {
                    ...applicant.toObject(),
                    jobDetails,
                    companyDetails,
                };
            });
    
  
            const populatedApplicants = await Promise.all(populatePromises);
    
            console.log(populatedApplicants);
            return populatedApplicants;
        } catch (error) {
            console.error('Error fetching hired applicants:', error);
            return { success: false, message: "Error fetching hired applicants" };
        }
    }
    async inreviewCompanies(userId:any) {
        try {
            const Inreview = await applicantionModel.find({
                email: userId,
                Status: 'Inreview',
            });
            if (!Inreview || Inreview.length === 0) {
                return [];
            }       
            const populatePromises = Inreview.map(async (applicant) => {
                const [jobDetails, companyDetails] = await Promise.all([
                    jobModel.findById(applicant.jobId, 'jobTitle'),
                    companyModel.findById(applicant.companyId, 'companyName location'),
                ]);
    
                return {
                    ...applicant.toObject(),
                    jobDetails,
                    companyDetails,
                };
            });
    
  
            const populatedApplicants = await Promise.all(populatePromises);
    
            console.log(populatedApplicants);
            return populatedApplicants;
        } catch (error) {
            console.error('Error fetching hired applicants:', error);
            return { success: false, message: "Error fetching hired applicants" };
        }
    }
    
    
    async interviewCompanies(userId:any) {
        try {
            console.log(userId);
    
           
            const interview = await applicantionModel.find({
                email: userId,
                Status: 'Interview',
            });
    
            
            if (!interview || interview.length === 0) {
                return [];
            }
    
           
            const populatePromises = interview.map(async (applicant) => {
                const [jobDetails, companyDetails] = await Promise.all([
                    jobModel.findById(applicant.jobId, 'jobTitle'),
                    companyModel.findById(applicant.companyId, 'companyName location'),
                ]);
    
                return {
                    ...applicant.toObject(),
                    jobDetails,
                    companyDetails,
                };
            });
    
  
            const populatedApplicants = await Promise.all(populatePromises);
    
            console.log(populatedApplicants);
            return populatedApplicants;
        } catch (error) {
            console.error('Error fetching hired applicants:', error);
            return { success: false, message: "Error fetching hired applicants" };
        }
    }
    
    async companyDetails(companyId: any) {
        try {
            const result = await companyModel.find({_id:companyId})
            return result;
        } catch (error) {
            console.error('Error updating applicant status:', error);
            return { success: false, message: "Error updating applicant status" };
        }
    }

}

const jobRepository = new CompanyRepository();

export default jobRepository;