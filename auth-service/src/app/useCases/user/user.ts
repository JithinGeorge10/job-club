import { OTP, User } from "../../../domain/entities/user";
import getUserRepository from '../../../infrastructure/database/mongooseUserRepository'
import sendotp from '../../../infrastructure/helper/sendOTP'
import produce from '../../../infrastructure/service/producer'
export class UserService {

    async createUser(userData: User): Promise<User | undefined> {
        try {
            const existingUser = await getUserRepository.findUserByEmail(userData.email)
            if (existingUser && existingUser.isVerified) {
                throw new Error("User already existssss");
            }
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()

            let userDetails 
            if (!existingUser) {
                userDetails = await getUserRepository.saveUser(userData)
            }else{
                userDetails=existingUser
            }
            await getUserRepository.saveOtp(generatedOtp, userDetails?._id)
            await sendotp(userData, generatedOtp)
            return userDetails

        } catch (error) {
            throw error
        }
    }

    async resendOTP(userDetail: User) {
        try {
            const user_id = await getUserRepository.findUserId(userDetail.email)
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
            await sendotp(userDetail, generatedOtp)
            await getUserRepository.saveOtp(generatedOtp, user_id?._id)

        } catch (error) {
            throw error
        }
    }


    async verifyOtp(userOtp: number, email: any) {
        try {

            const userDetails = await getUserRepository.verifyOtp(userOtp, email)
            if (userDetails) {
                try {
                    console.log("Producing to Kafka topic 'add-user':", userDetails);
                    await produce('add-user', userDetails)
                } catch (error) {
                    console.log(error)
                }
                return userDetails

            } else {
                throw new Error("Invalid Otp");
            }

        } catch (error) {
            throw error
        }
    }
    async userLogin(email: string, password: string) {
        try {
            const isUserBlock=await getUserRepository.isUserBlock(email)
            if(isUserBlock){
                throw new Error("User is blocked");
            }else{
                const userDetails = await getUserRepository.verifyUser(email, password)
    
                if (userDetails) {
                    return userDetails
                } else { 
                    throw new Error("Give valid credentials");
                }
            }
           

        } catch (error) {
            throw error
        }

    }

    async changePassword(password: any) {
        try {
            const changePassword = await getUserRepository.changePassword(password)
            return changePassword
        } catch (error) {
            throw error
        }
    }
    async userDetails() {
        try {
            const userDetails = await getUserRepository.userDetails()
            return userDetails
        } catch (error) {
            throw error
        }
    }

    
    async blockUser(userId: any) {
        try {
            const blockedUser = await getUserRepository.blockUser( userId );
            return blockedUser;
        } catch (error) {
            throw error;
        }
    }

    async unblockUser(userId: any) {
        try {
            const unblockUser = await getUserRepository.unblockUser( userId );
            return unblockUser;
        } catch (error) {
            throw error;
        }
    }
    async googleUser(email: any,displayName:any) {
        try {
            const isUserBlock=await getUserRepository.isUserBlock(email)
            if(isUserBlock){
                throw new Error("User is blocked");
            }
            const googleUser = await getUserRepository.googleUser( email, displayName);
            return googleUser;
        } catch (error) {
            throw error;
        }
    }
    
} 