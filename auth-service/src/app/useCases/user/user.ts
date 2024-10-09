import { User } from "../../../domain/entities/user";
import getUserRepository from '../../../infrastructure/database/mongooseUserRepository'
export class UserService {

    async createUser(userData: User): Promise<User | undefined> {
        try {
            console.log(userData);
            // const existingUser = await getUserRepository.findUserByEmail(userData.email)
            // if (existingUser) {
            //     throw new Error("User already exists")
            // }
            
            const userDetails = await getUserRepository.saveUser(userData)

            return userDetails

        } catch (error) {
            console.error(error);
        }
    }
} 