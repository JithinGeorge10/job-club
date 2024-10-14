import { User } from '../../domain/entities/user';
import { Company } from '../../domain/entities/company';
import transporter from '../../infrastructure/service/otpService'
let sendotp = async (auth:User | Company,otp:string) => {
    console.log(auth,otp);
    
    try {
        await transporter.sendMail({
            from: process.env.MAILID,
            to: auth.email ,
            subject: 'Registration OTP for Job Club',
            text: `Here is your One Time Password for registration: ${otp}`
        })
    } catch (err) {
        console.log(err);
    }
}

export default sendotp