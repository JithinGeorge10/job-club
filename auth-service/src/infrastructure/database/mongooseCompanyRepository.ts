import { Company } from "../../domain/entities/company";
import companyModel from "./model/companyModel";
import otpModel from "./model/otpModel";
import bcrypt from 'bcrypt';
class companyRepository {
    async findCompanyByEmail(email: string): Promise<Company | null> {
        try {
            const companyData = await companyModel.findOne({ email });
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

    async saveOtp(otp: string, companyId: any) {
        try {
            const otpDetail=await otpModel.create({ companyId, otpCode: otp });
            console.log('otototot'+otpDetail);
            
        } catch (error) {
            console.log(error);
        }
    }

   
    async verifyOtp(companyOtp: number, userEmail: string) {
        try {

            const companyDetails = await companyModel.findOne({ email: userEmail })
            const isOtp = await otpModel.findOne({otpCode: companyOtp,companyId:companyDetails?._id })
            if(isOtp){
                const companyDetails= await companyModel.findOne({ _id:isOtp.companyId})
                return companyDetails
            }else{
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }
    async findUserId(email: string) {
        try {
            const userId = await companyModel.findOne({ email });
            return userId
        } catch (error) {
            console.log(error);
        }
    }

    async verifyCompany(email:string,password:string) {
        try {
           const userData = await companyModel.findOne({ email });
           if(!userData){
                return null
           }
           const isPasswordValid = await bcrypt.compare(password, userData.password);
           if (isPasswordValid) {
            return userData.toObject() as Company;
        } else {
            return null;
        }
        } catch (error) {
            console.log(error);
        }
    }

}

const getCompanyRepository = new companyRepository();

export default getCompanyRepository;