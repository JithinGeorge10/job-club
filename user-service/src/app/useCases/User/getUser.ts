
import UserRepository from '../../../infrastructure/database/mongooseUserRepository'
export class UserService {
    async getUserDetails(userData: any) {
        try {
            const userDetails = await UserRepository.getUser(userData)
            return userDetails
        } catch (error) {
            throw error
        }
    }
    async addEmployment(userData: any) {
        try {
            const userDetails = await UserRepository.addEmployment(userData)
            return userDetails
        } catch (error) {
            throw error
        }
    }
    async addEducation(educationData: any) {
        try {
            const userDetails = await UserRepository.addEducation(educationData)
            return userDetails
        } catch (error) {
            throw error
        }
    }
    async addSkills(educationData: any) {
        try {
            const userDetails = await UserRepository.addSkills(educationData)
            return userDetails
        } catch (error) {
            throw error
        }
    }
    async addResume(resume: any) {
        try {
            const userDetails = await UserRepository.addResume(resume)
            return userDetails
        } catch (error) {
            throw error
        }
    }
    async addProfileImage(resume: any) {
        try {
            const profileImage = await UserRepository.addProfileImage(resume)
            return profileImage
        } catch (error) {
            throw error
        }
    }
    
    
}