import { Company } from "../../domain/entities/company";
import companyModel from "./model/companyModel";
class companyRepository {
    async findUserByEmail(email: string): Promise<Company | null> {
        try {
            const companyData = await companyModel.findOne({ email });
            console.log(companyData);
            return companyData ? companyData.toObject() as Company : null;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async saveCompany(companyData: Company) {
        try {
            const newComany = new companyModel(companyData);
            const companyDetails = await newComany.save();
            return companyDetails.toObject() as Company;
        } catch (error) {
            console.log(error);

        }
    }
}

const getCompanyRepository = new companyRepository();

export default getCompanyRepository;