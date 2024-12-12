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
    async addEmployment(userData: any,userIdFromToken:any) {
        try {
            
            const userDetails = await UserRepository.addEmployment(userData,userIdFromToken)
            return userDetails
        } catch (error) {
            throw error
        }
    }
    async addEducation(educationData: any,userIdFromToken:any) {
        try {
            const userDetails = await UserRepository.addEducation(educationData,userIdFromToken)
            return userDetails
        } catch (error) {
            throw error
        }
    }
    async addSkills(educationData: any,userIdFromToken:any) {
        try {
            const userDetails = await UserRepository.addSkills(educationData,userIdFromToken)
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
    async deleteResume(userIdFromToken:any) {
        try {
            const deleteResume = await UserRepository.deleteResume(userIdFromToken)
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
    async applyJob(userId:any,jobId: any) {
        try {
            const applyJob = await UserRepository.applyJob(userId,jobId)
            return applyJob
        } catch (error) {
            throw error
        }
    }
    async unsaveJob(userId:any,jobId: any) {
        try {
            const unsaveJob = await UserRepository.unsaveJob(userId,jobId)
            return unsaveJob
        } catch (error) {
            throw error
        }
    }

    async removeEmployment(userId:any,employmentId: any) {
        try {
            const removeEmployment = await UserRepository.removeEmployment(userId,employmentId)
            return removeEmployment
        } catch (error) {
            throw error
        }
    }
    async removeEducation(userId:any,educationId: any) {
        try {
            const removeEducation = await UserRepository.removeEducation(userId,educationId)
            return removeEducation
        } catch (error) {
            throw error
        }
    }
    
    async removeSkill(userId:any,skill: any) {
        try {
            const removeSkill = await UserRepository.removeSkill(userId,skill)
            return removeSkill
        } catch (error) {
            throw error
        }
    }
    async addPreferredJob(userId:any,job: any) {
        try {
            const addPreferredJob = await UserRepository.addPreferredJob(userId,job)
            return addPreferredJob
        } catch (error) {
            throw error
        }
    }
    
    async handleSubscriptionExpiry() {
        return await UserRepository.expireSubscriptions();
    }
    async subscriberList() {
        return await UserRepository.subscriberList();
    }
    

}

export default UserService;
