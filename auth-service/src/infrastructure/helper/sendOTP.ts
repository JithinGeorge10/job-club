import { User } from '../../domain/entities/user';
import { Company } from '../../domain/entities/company';
import transporter from '../../infrastructure/service/otpService'
let sendotp = async (userData:User | Company,otp:string) => {
    console.log(userData,otp);
    
    try {
        await transporter.sendMail({
            from: process.env.MAILID,
            to: userData.email ,
            subject: 'Registration OTP for Job Club',
            text: `Here is your One Time Password for registration: ${otp}`
        })
    } catch (err) {
        console.log(err);
    }
}

export default sendotp