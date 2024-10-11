import { User } from "../../../domain/entities/user";
import getUserRepository from '../../../infrastructure/database/mongooseUserRepository'
import sendotp from '../../../infrastructure/helper/sendOTP'
export class UserService {

    async createUser(userData: User): Promise<User | undefined > {
        try {
            console.log(userData);
            const existingUser = await getUserRepository.findUserByEmail(userData.email)
            if (existingUser) {
                throw new Error("User already existssss");
            }
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
            await sendotp(userData,generatedOtp)
            const userDetails = await getUserRepository.saveUser(userData)
            return userDetails

        } catch (error) {
           throw error
        }
    }
} 