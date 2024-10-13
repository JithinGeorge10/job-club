import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    otpCode: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 50 
    }
    
})


const otpModel = mongoose.model('OTP', otpSchema)

export default otpModel
