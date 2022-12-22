const mongoose = require('mongoose');

const user_role_enum = ["Admin", "Mentor", "Student"];
const application_status_enum = ["InProgress", "Completed"]

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required."],
        unique: true
    },
    user_role: {
        type: String,
        enum: user_role_enum,
        default: "Student"
    },
    job_application: {
        type: [
            {
                job_id: {
                    type: String,
                    required: true,
                },
                status: {
                    type: String,
                    enum: application_status_enum,
                    default: "InProgress"
                }
            }
        ]
    }

});

module.exports = mongoose.model("User", userSchema);