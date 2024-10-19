import mongoose from "mongoose";
import { genSalt, hash } from 'bcrypt'
const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company Name is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    website: {
        type: String,
        required: [true, 'website is required'],
    },
    industry: {
        type: String,
        required: [true, 'Industry is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
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


const companyModel = mongoose.model('Company', companySchema)

export default companyModel
