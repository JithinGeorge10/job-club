import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    education_details: { type: [mongoose.Schema.Types.Mixed], required: false },
    employment_details: { type: [mongoose.Schema.Types.Mixed], required: false },
    profileImage: { type: String, required: false },
    skills: { type: [String], required: false },
    resume: { type: String, required: false },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs', required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    Status: { type: String, required: true, default: 'applied' },
    createdAt: { type: Date, default: Date.now }
})


const applicationModel = mongoose.model('Applicants', applicationSchema)

export default applicationModel
