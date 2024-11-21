import { User } from "../../domain/entities/user";
import UserModel from './model/userModel';
import otpModel from './model/otpModel';
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import produce from "../service/producer";


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
                await UserModel.updateOne(
                    { _id: isOtp.userId },
                    { $set: { isVerified: true } }
                ); const userDetails = await UserModel.findOne({ _id: isOtp.userId })
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


    async isUserBlock(email: string) {
        try {
            const userData = await UserModel.findOne({ email, isBlock: true });
            if (userData) {
                return true
            }

        } catch (error) {
            console.log(error);
        }
    }


    async changePassword(data: any) {
        const { oldPassword, newPassword, confirmPassword } = data.data;
        const userId = data.userId;
        try {
            const user = await UserModel.findOne({ _id: userId })
            if (!user) {
                throw new Error("User not found");
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                throw new Error("Incorrect password");
            }
            if (newPassword === oldPassword) {
                throw new Error("New password cannot be the same as the old password");
            }
            if (newPassword !== confirmPassword) {
                throw new Error("New password and confirm password do not match");
            }

            user.password = newPassword;
            await user.save();

            console.log(user)
        } catch (error) {
            console.log(error);
            throw error;
        }

    }


    async userDetails() {
        try {
            const userDetails = await UserModel.find();
            return userDetails
        } catch (error) {
            console.log(error);
        }
    }

    async blockUser(userId: any) {
        try {
            const actualUserId = new mongoose.Types.ObjectId(userId.userId);

            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: actualUserId },
                { $set: { isBlock: true } },
                { new: true }
            );
            return updatedUser;
        } catch (error) {
            console.error("Error blocking user:", error);
            throw error;
        }
    }
    async unblockUser(userId: any) {
        try {
            const actualUserId = new mongoose.Types.ObjectId(userId.userId);

            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: actualUserId },
                { $set: { isBlock: false } },
                { new: true }
            );
            return updatedUser;
        } catch (error) {
            console.error("Error blocking user:", error);
            throw error;
        }
    }



    async googleUser(email: string, name: string) {
        try {
            const existingUser = await UserModel.findOne({ email });

            if (existingUser) {
                console.log('User already exists:', existingUser);
                return existingUser;
            }

            const hashedPassword = await bcrypt.hash('12345', 10);

            const newUser = new UserModel({
                firstName: name,
                email: email,
                lastName: 'Not Provided',
                phone: '0',
                password: hashedPassword,
            });

            const savedUser = await newUser.save();
            await produce('add-user', savedUser)
            console.log('New user created:', savedUser);
            return savedUser;
        } catch (error) {
            console.error('Error handling Google user:', error);
            throw error;
        }
    }

}

const getUserRepository = new UserRepository();

export default getUserRepository;
