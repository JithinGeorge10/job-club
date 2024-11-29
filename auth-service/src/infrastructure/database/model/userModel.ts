import mongoose from "mongoose";
import { genSalt, hash } from 'bcryptjs'
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required'],
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    phone: {
        type: Number,
        required: [true, 'phone is required'],
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, required: false }
})

userSchema.pre("save", async function (next) {
    const salt = await genSalt()
    this.password = await hash(this.password, salt)
    next()
})

const userModel = mongoose.model('Users', userSchema)

export default userModel
