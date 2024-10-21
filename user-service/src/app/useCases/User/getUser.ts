
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

    
    
}