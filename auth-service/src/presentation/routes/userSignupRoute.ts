import { Router } from "express";
import { userSignupController} from "../controller/userSignupController";

const userSignupRoute = Router()

userSignupRoute.post('/user-signup',userSignupController)

export default userSignupRoute