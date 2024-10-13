import { Number, ObjectId } from "mongoose";
import { OTP, User } from "../../../domain/entities/user";
import getUserRepository from '../../../infrastructure/database/mongooseUserRepository'
import sendotp from '../../../infrastructure/helper/sendOTP'
export class UserService {

    async createUser(userData: User): Promise<User | undefined> {
        try {
            const existingUser = await getUserRepository.findUserByEmail(userData.email)
            if (existingUser) {
                throw new Error("User already existssss");
            }
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
            await sendotp(userData, generatedOtp)
            const userDetails = await getUserRepository.saveUser(userData)
            await getUserRepository.saveOtp(generatedOtp, userDetails?._id)

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
    async verifyOtp(userOtp: number,email:string) {
        try {
            const userDetails=await getUserRepository.verifyOtp(userOtp,email)
            console.log('gotcha'+userDetails)
            if(userDetails){
                return userDetails
            }else{
                throw new Error("Invalid Otp");
            }
            
        } catch (error) {
            throw error
        }
    }




} 