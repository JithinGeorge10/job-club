import { User } from "../../domain/entities/user";
import userModel from "./model/userModel"

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
}
const getUserRepository = new UserRepository();

export default getUserRepository;