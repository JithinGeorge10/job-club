import { User } from "../../domain/entities/User";
import userModel from "./model/userModel";
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
           const userDetails=await userModel.findOne({_id:userId})
           console.log(userDetails);
           return userDetails
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
const getUserRepository = new UserRepository();

export default getUserRepository;