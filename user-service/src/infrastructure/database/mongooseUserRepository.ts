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

            return fullUserDetails;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addEmployment(userData: any, userIdFromToken: any) {
        try {
            const { companyName, jobTitle, experience, salary, skills, fromDate, toDate } = userData.data;
            const employmentDetails = {
                companyName, jobTitle, experience, salary, skills, fromDate, toDate
            };

            const userId = userData.userId;
            const result = await UserProfileModel.updateOne(
                { userId: userIdFromToken },
                { $push: { employment_details: employmentDetails } },
                { new: true, upsert: true }
            );
            return true
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addEducation(educationData: any, userIdFromToken: any) {
        try {
            const { education, university, course, specialization, courseType, cgpa, fromYear, toYear } = educationData.data;
            const educationDetails = {
                education, university, course, specialization, courseType, cgpa, fromYear, toYear
            };
            const userId = educationData.userId;
            const result = await UserProfileModel.updateOne(
                { userId: userIdFromToken },
                { $push: { education_details: educationDetails } },
                { new: true, upsert: true }
            );
            return true
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    async addSkills(educationData: any, userIdFromToken: any) {
        try {


            const { skills } = educationData;

            const updateResult = await UserProfileModel.updateOne(
                { userId: userIdFromToken },
                {
                    $addToSet: {
                        skills: { $each: Object.values(skills) }
                    }
                }
            );

            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async addResume(resume: any) {
        try {

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
    async deleteResume(userIdFromToken: any) {
        try {

            const deleteResume = await UserProfileModel.updateOne(
                { userIdFromToken },
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
            console.log('payment started');

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
            console.log('payment success');
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
            const oneYearFromNow = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);


            await UserProfileModel.updateOne(
                { userId: actualUserId },
                { $set: { subscriber: true, subscriptionExpiry: oneYearFromNow } }
            );

            return result
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async saveJob(userId: any, jobId: any) {
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
    async applyJob(userId: any, jobId: any) {
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

    async unsaveJob(userId: any, jobId: any) {
        try {
            const result = await UserProfileModel.updateOne(
                { userId },
                { $pull: { saved_jobs: jobId } }
            );
            return result;
        } catch (error) {
            console.log("Error unsaving job:", error);
            throw error;
        }
    }
    async removeEmployment(userId: any, employmentId: any) {
        try {
          console.log('User ID:', userId);
          console.log('Employment ID:', employmentId);
          const userIdObject = new mongoose.Types.ObjectId(userId);
          const employmentIdObject = new mongoose.Types.ObjectId(employmentId);
      
          const result = await UserProfileModel.updateOne(
            { userId: userIdObject },
            { $pull: { employment_details: { _id: employmentIdObject } } }
          );
      
          console.log('Update Result:', result);
      
          if (result.modifiedCount > 0) {
            console.log(`Employment ID ${employmentId} removed successfully for user ${userId}.`);
            return { success: true, message: 'Employment removed successfully' };
          } else {
            console.log(`No matching employment ID ${employmentId} found for user ${userId}.`);
            return { success: false, message: 'No matching employment found' };
          }
        } catch (error) {
          console.error('Error removing employment:', error);
          throw error;
        }
      }



      async removeEducation(userId: any, educationId: any) {
        try {
          console.log('User ID:', userId);
          console.log('Employment ID:', educationId);
          const userIdObject = new mongoose.Types.ObjectId(userId);
          const educationIdObject = new mongoose.Types.ObjectId(educationId);
      
          const result = await UserProfileModel.updateOne(
            { userId: userIdObject },
            { $pull: { education_details: { _id: educationIdObject } } }
          );
      
          console.log('Update Result:', result);
      
          if (result.modifiedCount > 0) {
            console.log(`Employment ID ${educationId} removed successfully for user ${userId}.`);
            return { success: true, message: 'Employment removed successfully' };
          } else {
            console.log(`No matching employment ID ${educationId} found for user ${userId}.`);
            return { success: false, message: 'No matching employment found' };
          }
        } catch (error) {
          console.error('Error removing employment:', error);
          throw error;
        }
      }
      
    async expireSubscriptions() {
        const now = new Date();

        try {
            const expiredUsers = await UserProfileModel.find({
                subscriber: true,
                subscriptionExpiry: { $lt: now }
            });

            for (const user of expiredUsers) {
                await UserProfileModel.updateOne(
                    { userId: user.userId },
                    { $set: { subscriber: false } }
                );
            }

            return expiredUsers.length;
        } catch (error) {
            console.log(error);
        }
    }

    async subscriberList() {
        try {
            const result = await UserProfileModel.aggregate([
                {
                    $match: { subscriber: true }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                {
                    $project: {
                        userId: 1,
                        subscriber: 1,
                        userDetails: {
                            _id: 1,
                            firstName: 1,
                            lastName: 1,
                            phone: 1,
                            email: 1
                        }
                    }
                }
            ]);
            return result;
        } catch (error) {
            console.error("Error fetching subscriber list:", error);
            throw error;
        }
    }

}
const getUserRepository = new UserRepository();

export default getUserRepository;