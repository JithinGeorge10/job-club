import mongoose from "mongoose";
const userPaymentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: [true, 'status is requred'],
    }
})

const userPaymentModel = mongoose.model('Payment', userPaymentSchema)

export default userPaymentModel
