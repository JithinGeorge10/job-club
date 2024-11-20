import { Company } from "../../domain/entities/company";
import companyModel from "./model/companyModel";
class CompanyRepository {
    async addCompany(companyDetails: Company) {
        try {
            const newCompany = new companyModel(companyDetails);
            await newCompany.save()
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addProfileImage(companyDetails: any) {
        try {
           

            const { uploadImageUrl, companyId } = companyDetails;
            const addResume = await companyModel.updateOne(
                { _id: companyId},
                { $set: { profileImage: uploadImageUrl } },
                { upsert: true }
            );


            return addResume;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
}
const getCompanyRepository = new CompanyRepository();

export default getCompanyRepository;