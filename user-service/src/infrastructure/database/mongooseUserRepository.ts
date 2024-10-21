import { User } from "../../domain/entities/User";
import userModel from "./model/userModel";
import UserProfileModel from "./model/userProfileModel";

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
           
            const { education, university,course, specialization, courseType,cgpa,fromYear,toYear } = educationData.data;

            console.log(educationData.userId)
            const educationDetails = {
                education, university,course, specialization, courseType,cgpa,fromYear,toYear
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
    

}
const getUserRepository = new UserRepository();

export default getUserRepository;