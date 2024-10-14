import { Company } from "../../../domain/entities/company";
import getCompanyRepository from '../../../infrastructure/database/mongooseCompanyRepository'
import sendotp from "../../../infrastructure/helper/sendOTP";

export class CompanyService {
    async createCompany(companyData: Company): Promise<Company | undefined> {
        console.log(companyData)
        const existingUser = await getCompanyRepository.findUserByEmail(companyData.email)
        if (existingUser) {
            throw new Error("Company already existssss");
        }
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
        await sendotp(companyData, generatedOtp)
        const companyDetails = await getCompanyRepository.saveCompany(companyData)
        return companyDetails
         
    }
}