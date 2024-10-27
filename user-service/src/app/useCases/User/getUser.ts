const crypto = require('crypto');
import UserRepository from '../../../infrastructure/database/mongooseUserRepository'
import { PAYU_MERCHANT_KEY, PAYU_MERCHANT_SALT, PAYU_TEST_URL } from '../../../utils/config';
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
    async payment() {
        try {
            console.log('pay');
            
            const generateHash = (data: any) => {
                const hashString = `${data.key}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${PAYU_MERCHANT_SALT}`;
                return crypto.createHash('sha512').update(hashString).digest('hex');
            };
            const txnid = `txn_${new Date().getTime()}`;

            const amount = 1000
            const productinfo = 'Subscribe for premium account'
            const firstname = 'suresh'
            const email = 'suresh@gmail'
            const phone = 9302920202

            const paymentData = {
                key: PAYU_MERCHANT_KEY,
                txnid,
                amount,
                productinfo,
                firstname,
                email,
                phone,
                surl: 'http://localhost:3000/payment/success', // Success URL
                furl: 'http://localhost:3000/payment/failure', // Failure URL
                hash: generateHash({ key: PAYU_MERCHANT_KEY, txnid, amount, productinfo, firstname, email })
            };
            return { action: PAYU_TEST_URL, paymentData }
            // res.json({ action: PAYU_TEST_URL, paymentData });
        } catch (error) {
            throw error
        }
    }




}