const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    job_role: {
        type:String,
        required: true,
    },
    company_name: {
        type:String,
        required: true,
    },
    ctc: {
        type:Number,
        min:3,
        max:200,
        required: true,
    },
    experience_required: {
        type: Number,
        min:0,
        max:25,
        required: true,
    },
    location_type: {
        type:String,
        enum: ['Office','Remote','Hybrid'],
        default: 'Office',
    }
})

module.exports = mongoose.model("Job",jobSchema);