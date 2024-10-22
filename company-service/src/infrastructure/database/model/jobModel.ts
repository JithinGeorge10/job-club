import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: [true, 'Job Title is required'],
    },
    employmentType: {
        type: [String], // Allows for multiple employment types if needed
        required: [true, 'Employment Type is required'],
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date is required'],
    },
    endDate: {
        type: Date,
        required: [true, 'End Date is required'],
    },
    minSalary: {
        type: Number,
        required: [true, 'Minimum Salary is required'],
    },
    maxSalary: {
        type: Number,
        required: [true, 'Maximum Salary is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    slots: {
        type: Number,
        required: [true, 'Number of slots is required'],
    },
    jobDescription: {
        type: String,
        required: [true, 'Job Description is required'],
    },
    qualification: {
        type: String,
        required: [true, 'Qualification is required'],
    },
    jobResponsibilities: {
        type: String,
        required: [true, 'Job Responsibilities are required'],
    },
    requirements: {
        type: String,
        required: [true, 'Requirements are required'],
    },
    skills: {
        type: [Object], // Assuming skills will be stored as an array of objects
        required: [true, 'Skills are required'],
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, required: false }
});

const jobModel = mongoose.model('Job', jobSchema);

export default jobModel;
