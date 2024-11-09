
import CompanyRepository from '../../../infrastructure/database/mongooseCompanyRepository'
export class CompanyService {
    async createCompany(companyData: any) {
        try {
            console.log('reached service');
            console.log('service' + companyData);

            const company = await CompanyRepository.addCompany(companyData)

        } catch (error) {
            throw error
        }
    }
}