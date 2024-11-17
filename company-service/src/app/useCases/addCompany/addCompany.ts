
import CompanyRepository from '../../../infrastructure/database/mongooseCompanyRepository'
export class CompanyService {
    async createCompany(companyData: any) {
        try {
      

            const company = await CompanyRepository.addCompany(companyData)

        } catch (error) {
            throw error
        }
    }
}