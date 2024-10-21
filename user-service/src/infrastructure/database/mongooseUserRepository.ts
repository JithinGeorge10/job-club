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
            const userDetails = await userModel.findOne({ _id: userId })
            console.log(userDetails);
            return userDetails
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

}
const getUserRepository = new UserRepository();

export default getUserRepository;