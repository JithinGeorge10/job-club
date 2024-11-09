import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'last name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, 'Phone is required'],
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, required: false }
})



const userModel = mongoose.model('Users', userSchema)

export default userModel
