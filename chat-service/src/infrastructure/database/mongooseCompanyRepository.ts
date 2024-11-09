import { Company } from "../../domain/entities/company";
import companyModel from "./model/companyModel";
class CompanyRepository {
    async addCompany(companyDetails: Company) {
        try {
            const newCompany = new companyModel(companyDetails);
            console.log(newCompany);
            await newCompany.save()
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
const getCompanyRepository = new CompanyRepository();

export default getCompanyRepository;