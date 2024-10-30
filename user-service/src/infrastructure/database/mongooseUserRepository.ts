import { User } from "../../domain/entities/User";
import userModel from "./model/userModel";
import mongoose from 'mongoose';
import UserProfileModel from "./model/userProfileModel";
import userPaymentModel from "./model/userPaymentModel";

class UserRepository {
    async addUser(userDetails: User) {
        try {
            const newUser = new userModel(userDetails);
            await newUser.save()
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getUser(userId: User) {
        try {
            // const userDetails = await userModel.findOne({ _id: userId })
            // console.log(userDetails);
            // return userDetails

            const [userDetails, userProfile] = await Promise.all([
                userModel.findOne({ _id: userId }),
                UserProfileModel.findOne({ userId })
            ]);
            if (!userDetails) {
                throw new Error(`User not found with id ${userId}`);
            }
            const fullUserDetails = {
                ...userDetails.toObject(),
                profile: userProfile ? userProfile.toObject() : null
            };

            console.log(fullUserDetails);
            return fullUserDetails;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addEmployment(userData: any) {
        try {
            console.log('reache repo');
            console.log(userData);
            const { companyName, jobTitle, experience, salary, skills, fromDate, toDate } = userData.data;

            console.log(userData.userId)
            const employmentDetails = {
                companyName, jobTitle, experience, salary, skills, fromDate, toDate
            };

            const userId = userData.userId;

            const result = await UserProfileModel.updateOne(
                { userId: userId },
                { $push: { employment_details: employmentDetails } },
                { new: true, upsert: true }
            );

            console.log('Employment added:', result);
            return true
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addEducation(educationData: any) {
        try {
            console.log('reache repo');
            console.log(educationData);

            const { education, university, course, specialization, courseType, cgpa, fromYear, toYear } = educationData.data;

            console.log(educationData.userId)
            const educationDetails = {
                education, university, course, specialization, courseType, cgpa, fromYear, toYear
            };

            const userId = educationData.userId;

            const result = await UserProfileModel.updateOne(
                { userId: userId },
                { $push: { education_details: educationDetails } },
                { new: true, upsert: true }
            );

            console.log('Education added:', result);
            return true
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    async addSkills(educationData: any) {
        try {
            console.log('reache repo');
            console.log(educationData);

            const { userId, skills } = educationData;

            const updateResult = await UserProfileModel.updateOne(
                { userId: userId },
                {
                    $addToSet: {
                        skills: { $each: Object.values(skills) }
                    }
                }
            );

            console.log(updateResult);
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async addResume(resume: any) {
        try {
            console.log('reache repo');
            console.log(resume);

            const { uploadImageUrl, userId } = resume;
            const addResume = await UserProfileModel.updateOne(
                { userId },
                { $set: { resume: uploadImageUrl } },
                { upsert: true }
            );


            return addResume;
        } catch (error) {
            console.log(error);
            throw error;

        }
    }
    async addProfileImage(resume: any) {
        try {
            console.log('reache repo');
            console.log(resume);

            const { uploadImageUrl, userId } = resume;
            const addResume = await UserProfileModel.updateOne(
                { userId },
                { $set: { profileImage: uploadImageUrl } },
                { upsert: true }
            );


            return addResume;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deleteResume(resume: any) {
        try {
            console.log('reache repo');
            console.log(resume);
            const { userId } = resume
            const deleteResume = await UserProfileModel.updateOne(
                { userId },
                { $unset: { resume: "" } }
            );
            return deleteResume


        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async startPayment(userId: any) {
        try {
            console.log('reache repo');
            console.log(userId);
            const actualUserId = new mongoose.Types.ObjectId(userId.userId);

            const result = await userPaymentModel.findOneAndUpdate(
                { userId: actualUserId },
                { paymentStatus: 'pending' },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            return result
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async successPayment(userDetails: any) {
        try {
            console.log('reache repo');
            console.log(userDetails);
            const actualUserId = new mongoose.Types.ObjectId(userDetails.productinfo);

            const result = await userPaymentModel.findOneAndUpdate(
                { userId: actualUserId },
                {
                    paymentStatus: 'success', amount: userDetails.net_amount_debit,
                    paymentSource: userDetails.payment_source, bank_ref_num: userDetails.bank_ref_num,
                    bankcode: userDetails.bankcode, cardnum: userDetails.cardnum, transactionId: userDetails.txnid
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );

            await UserProfileModel.updateOne(
                { userId: actualUserId },
                { $set: { subscriber: true } }
            );

            console.log(result)
            return result
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async saveJob(userId:any,jobId: any) {
        try {
            const result = await UserProfileModel.updateOne(
                { userId }, 
                { $addToSet: { saved_jobs: jobId } } 
            );
            return result
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async applyJob(userId:any,jobId: any) {
        try {
            const result = await UserProfileModel.updateOne(
                { userId }, 
                { $addToSet: { applied_jobs: jobId } } 
            );
            return result
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    


}
const getUserRepository = new UserRepository();

export default getUserRepository;