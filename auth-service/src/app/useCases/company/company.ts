import { AnyARecord } from "dns";
import { Company } from "../../../domain/entities/company";
import getCompanyRepository from '../../../infrastructure/database/mongooseCompanyRepository'
import sendotp from "../../../infrastructure/helper/sendOTP";
import produce from "../../../infrastructure/service/producer";

export class CompanyService {
    async createCompany(companyData: Company): Promise<Company | undefined> {
        try {
            const existingCompany = await getCompanyRepository.findCompanyByEmail(companyData.email)

            if (existingCompany) {
                throw new Error("Company already existssss");
            }
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
            await sendotp(companyData, generatedOtp)
            const companyDetails = await getCompanyRepository.saveCompany(companyData)
            await getCompanyRepository.saveOtp(generatedOtp, companyDetails?._id)
            return companyDetails
        } catch (error) {
            throw error
        }
    }

    async verifyOtp(userOtp: number, email: string) {
        try {
            const companyDetails = await getCompanyRepository.verifyOtp(userOtp, email)
            if (companyDetails) {
                try {
                    await produce('add-company', companyDetails)
                } catch (error) {
                    console.log(error)
                }
                return companyDetails
            } else {
                throw new Error("Invalid Otp");
            }
        } catch (error) {
            console.log(error);
        }
    }
    async resendOTP(companyDetail: Company) {
        try {
            const company_id = await getCompanyRepository.findUserId(companyDetail.email)
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
            await sendotp(companyDetail, generatedOtp)
            await getCompanyRepository.saveOtp(generatedOtp, company_id?._id)

        } catch (error) {
            throw error
        }
    }

    async companyLogin(email: string, password: string) {
        try {

            const isCompanyBlock=await getCompanyRepository.isCompanyBlock(email)

            if(isCompanyBlock){
                throw new Error("User is blocked");
            }else{
                const companyDetails = await getCompanyRepository.verifyCompany(email, password)
    
                if (companyDetails) {
                    return companyDetails
                } else {
                    throw new Error("Give valid credentials");
                }
            }

          

        } catch (error) {
            throw error
        }
    }
    async getCompanyDetails() {
        try {

            const companyDetails = await getCompanyRepository.getCompany()
            return companyDetails


        } catch (error) {
            throw error
        }
    }

    async blockCompany(companyId: any) {
        try {
            const blockedUser = await getCompanyRepository.blockUser( companyId );
            return blockedUser;
        } catch (error) {
            throw error;
        }
    }
    
    async unBlockCompany(companyId: any) {
        try {

            const unBlockCompany = await getCompanyRepository.unBlockCompany(companyId)
            return unBlockCompany

        } catch (error) {
            throw error
        }
    }
    
}