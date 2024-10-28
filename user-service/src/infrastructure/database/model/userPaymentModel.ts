import mongoose from "mongoose";
const userPaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User '
    },
    paymentStatus: {
        type: String,
        default: 'pending',
        required: [true, 'status is requred'],
    },
    amount: {
        type: String,
        required: false
    },
    paymentSource: {
        type: String,
        required: false
    },
    bank_ref_num:{
        type: String,
        required: false
    },
    bankcode:{
        type: String,
        required: false
    },
    cardnum:{
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

userPaymentSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const userPaymentModel = mongoose.model('Payment', userPaymentSchema)

export default userPaymentModel
