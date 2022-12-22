const express = require('express');
const Job = require('../models/job');
const User = require('../models/user');

const router = express.Router();

//Create job
router.post("/jobs", async (req, res) => {
    try {
        const job = new Job({
            job_title: req.body.job_title,
            job_role: req.body.job_role,
            company_name: req.body.company_name,
            ctc: req.body.ctc,
            experience_required: req.body.experience_required,
            location_type: req.body.location_type
        })
        await job.save()
        res.status(201);
        res.send(job);
    } catch (err) {
        res.status(400);
        res.send(err);
    }
})

//Fetch all Jobs
router.get("/jobs", async (req, res) => {
    const jobs = await Job.find()
    res.send(jobs);
})

//Fetch job by id
router.get("/jobs/:id", async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id })
        res.send(job);
    } catch {
        res.status(404);
        res.send({ error: "Job doesn't exists" });
    }
})

//Delete job by id
router.delete("/jobs/:id", async (req, res) => {
    try {
        await Job.deleteOne({ _id: req.params.id })
        req.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Job doesn't exists" });
    }
})

//Create a user
router.post("/user", async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            user_role: req.body.user_role
        })

        await user.save();
        res.status(201);
        res.send(user);
    } catch (err) {
        res.status(400);
        res.send({ "error": err })
    }
})

//Get User
router.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.send(user);
    } catch {
        res.status(404);
        res.send({ "error": "User does not exists." })
    }
})


//Add User Job Application
router.post("/user/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        const application = user.job_application.find(item => item.job_id === req.body.job_id);
        if (application === undefined) {
            user.job_application.push({
                job_id: req.body.job_id,
                status: req.body.status
            });
            user.save();
            res.status(200);
            res.send(user);
        } else {
            res.status(404);
            res.send({ "message": "User already applied for this Job!" })
        }
    } catch {
        res.status(404);
        res.send({ "error": "User does not exists." });
    }
})

//Change Status of Job Application 
router.patch("/user/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        const application = user.job_application.find(item => item.job_id === req.body.job_id);
        if (application !== undefined) {
            if (req.body.status === "Completed") {
                const job = await Job.findOne({_id: req.body.job_id}); // Adding User info in job applicants list
                job.applicants.push({
                    user_id: user._id,
                    username: user.username
                })
                job.save();  
                application.status = req.body.status;
                user.save();
                res.status(200);
                res.send({ "message": "Job application submitted." });
            }else{
                res.status(400);
                res.send({"message": "Incorrect Job status."});
            }
        } else {
            res.status(400);
            res.send({ "message": "Apply for the Job first." })
        }
    } catch {
        res.status(404);
        res.send({ "message": "User does not exists." })
    }
})

module.exports = router;