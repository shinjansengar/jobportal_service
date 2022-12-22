const mongoose = require('mongoose');

let location_type_enum = ['Office', 'Remote', 'Hybrid'];
let role_type_enum = ['Production', 'QA', 'Programming', 'Design', 'Art', 'Other']

const jobSchema = mongoose.Schema({
    job_role: {
        type: String,
        enum: role_type_enum,
        default: 'Other'
    },
    job_title: {
        type: String,
        required: [true, 'Job title is required'],
    },
    company_name: {
        type: String,
        required: [true, 'Company name is required'],
    },
    ctc: {
        min: {
            type: Number, min: 1,
            validate: {
                validator: function (val) {
                    let maxValue = this.ctc.max;
                    return maxValue !== undefined ? maxValue >= val : true;
                },
                message: "The min value must be <= than max value."
            }
        },
        max: {
            type: Number, min: 1,
            validate: {
                validator: function (val) {
                    let minValue = this.ctc.min;
                    return minValue !== undefined ? minValue <= val : true;
                },
                message: "The max value must be >= than min value."
            }
        },
    },
    experience_required: {
        min: {
            type: Number, min: 0,
            validate: {
                validator: function (val) {
                    let maxValue = this.experience_required.max;
                    return maxValue !== undefined ? maxValue >= val : true;
                },
                message: "The min value must be <= than max value."
            }
        },
        max: {
            type: Number, min: 0, max: 25,
            validate: {
                validator: function (val) {
                    let minValue = this.experience_required.min;
                    return minValue !== undefined ? minValue <= val : true;
                },
                message: "The max value must be >= than min value."
            }
        },
    },
    location_type: {
        type: String,
        enum: location_type_enum,
        default: "Office"
    },
    applicants:{
        type:[
            {
                user_id:{
                    type: String,
                    required: true
                },
                username:{
                    type: String,
                    required: true
                }
            }
        ]
    }
})

module.exports = mongoose.model("Job", jobSchema);