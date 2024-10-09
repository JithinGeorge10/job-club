import { User } from "../../domain/entities/user";
import UserModel from './model/userModel';

class UserRepository {
    async findUserByEmail(email: string): Promise<User | null> {
        try {
            console.log('email: ' + email);
            const userData = await UserModel.findOne({ email });
            return userData ? userData.toObject() as User : null;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async saveUser(userData: User) {
        try {
            console.log('saveUser');
            
            const newUser = new UserModel(userData);
            const userDetails=await newUser.save();
            return userDetails.toObject() as User;
        } catch (error) {
            console.log(error);
 
        }
    }
}

const getUserRepository = new UserRepository();

export default getUserRepository;
