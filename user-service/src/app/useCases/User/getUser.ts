const crypto = require('crypto');
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
    async deleteResume(resume: any) {
        try {
            const deleteResume = await UserRepository.deleteResume(resume)
            return deleteResume
        } catch (error) {
            throw error
        }
    }
   
    async startPayment(userId: any) {
        try {
            const startPayment = await UserRepository.startPayment(userId)
            return startPayment
        } catch (error) {
            throw error
        }
    }
    async successPayment(userDetails: any) {
        try {
            const startPayment = await UserRepository.successPayment(userDetails)
            return startPayment
        } catch (error) {
            throw error
        }
    }
    async saveJob(userId:any,jobId: any) {
        try {
            const savedJob = await UserRepository.saveJob(userId,jobId)
            return savedJob
        } catch (error) {
            throw error
        }
    }
    
 
    

}