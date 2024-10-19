import { User } from "../../domain/entities/user";
import UserModel from './model/userModel';
import otpModel from './model/otpModel';
import bcrypt from 'bcrypt';


class UserRepository {


    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const userData = await UserModel.findOne({ email });
            return userData ? userData.toObject() as User : null;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async saveUser(userData: User) {
        try {
            const newUser = new UserModel(userData);
            const userDetails = await newUser.save();
            return userDetails.toObject() as User;
        } catch (error) {
            console.log(error);

        }
    }
    async saveOtp(otp: string, userId: any) {
        try {
            await otpModel.create({ userId, otpCode: otp });
        } catch (error) {
            console.log(error);
        }
    }
    async findUserId(email: string) {
        try {
            const userId = await UserModel.findOne({ email });
            return userId
        } catch (error) {
            console.log(error);
        }
    }

    async verifyOtp(userOtp: number, userEmail: string) {
        try {

            const userDetails = await UserModel.findOne({ email: userEmail })
            const isOtp = await otpModel.findOne({ otpCode: userOtp, userId: userDetails?._id })
            if (isOtp) {
                const userDetails = await UserModel.findOne({ _id: isOtp.userId })
                return userDetails
            } else {
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }
    async verifyUser(email: string, password: string) {
        try {
            const userData = await UserModel.findOne({ email });
            if (!userData) {
                return null
            }
            const isPasswordValid = await bcrypt.compare(password, userData.password);
            if (isPasswordValid) {
                return userData.toObject() as User;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }


}

const getUserRepository = new UserRepository();

export default getUserRepository;
