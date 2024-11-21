import { ADMIN_MAIL, ADMIN_PASSWORD } from "../../../utils/constants";

export class AdminService {

    async adminVerify(email: string, password: string) {
        try {
            if(email==ADMIN_MAIL && password==ADMIN_PASSWORD){
                return true
            }
        } catch (error) {
            console.log(error);

        }

    }
}