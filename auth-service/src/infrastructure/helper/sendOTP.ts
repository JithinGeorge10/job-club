import { User } from '../../domain/entities/user';
import transporter from '../../infrastructure/service/otpService'
let sendotp = async (userData:User,otp:string) => {
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