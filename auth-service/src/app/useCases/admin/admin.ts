import { ADMIN_MAIL, ADMIN_PASSWORD } from "../../../utils/config";

export class AdminService {

    async adminVerify(email: string, password: string) {
        try {
            console.log(email, password);
            if(email==ADMIN_MAIL && password==ADMIN_PASSWORD){
                return true
            }
        } catch (error) {
            console.log(error);

        }

    }
}