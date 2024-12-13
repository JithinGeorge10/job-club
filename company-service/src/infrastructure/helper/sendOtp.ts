import transporter from '../../infrastructure/service/otpService'

let sendotp = async (userMail:any) => {
    try {
        await transporter.sendMail({
            from: process.env.MAILID,
            to: userMail,
            subject: 'Update on Your Job Application',
            text: `Dear Candidate,

We are pleased to inform you that after careful consideration, you have been selected for the position you applied for. Welcome aboard! 

Our team will reach out to you shortly with the next steps in the onboarding process. If you have any questions in the meantime, please feel free to contact us.


`
        });
    } catch (err) {
        console.log(err);
    }
}

export default sendotp;
