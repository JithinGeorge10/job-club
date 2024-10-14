import { Company } from "../../../domain/entities/company";
import getCompanyRepository from '../../../infrastructure/database/mongooseCompanyRepository'
import sendotp from "../../../infrastructure/helper/sendOTP";

export class CompanyService {
    async createCompany(companyData: Company): Promise<Company | undefined> {
        const existingCompany = await getCompanyRepository.findCompanyByEmail(companyData.email)
        if (existingCompany) {
            throw new Error("Company already existssss");
        }
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
        await sendotp(companyData, generatedOtp)
        const companyDetails = await getCompanyRepository.saveCompany(companyData)
        await getCompanyRepository.saveOtp(generatedOtp, companyDetails?._id)
        return companyDetails
         
    }

    async verifyOtp(userOtp: number,email:string) {
        const companyDetails=await getCompanyRepository.verifyOtp(userOtp,email)
            if(companyDetails){
                return companyDetails
            }else{
                throw new Error("Invalid Otp");
            }
            
    }
    async resendOTP(companyDetail: Company) {
        try {
            console.log(companyDetail.email);
            const company_id = await getCompanyRepository.findUserId(companyDetail.email)
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
            await sendotp(companyDetail, generatedOtp)
            await getCompanyRepository.saveOtp(generatedOtp, company_id?._id)

        } catch (error) {
            throw error
        }
    }
    
}