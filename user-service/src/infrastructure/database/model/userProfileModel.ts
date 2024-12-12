import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',  
        required: true
    },
    address: {
        type: String,
        required: [false, 'Address is required'],
    },
    employment_details: [
        {
            companyName: String,
            experience: String,
            fromDate: Date,
            toDate: Date,
            jobTitle:String,
            salary:String,
            skills:String,
            isCurrent: Boolean
        }
    ],
    education_details: [
        {
            education:String, 
            university:String, 
            course:String, 
            specialization:String, 
            courseType:String, 
            cgpa:Number, 
            fromYear:Date,
            toYear:Date
        }
    ],
    skills: {
        type: [String],
        required: false
    },
    resume: {
        type: String,  
        required: false
    },
    profileImage: {
        type: String,  
        required: false
    },
    
    saved_jobs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Jobs',
        required: false
    },
    applied_jobs: {
        type: [mongoose.Schema.Types.ObjectId],  
        ref: 'Jobs',
        required: false
    },
    subscriber: {
        type: Boolean,
        required: true,
        default: false
    },
    subscriptionExpiry: {
        type: Date,
        default: null
    },
    status: {
        type: Boolean,
        required: true,
        default: true  
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date 
    },
    preferredJob:{
        type:String
    }
});

const UserProfileModel = mongoose.model('UserProfile', userProfileSchema);

export default UserProfileModel;
