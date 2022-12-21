const express = require('express');
const Job = require('../models/jobs');

const router = express.Router();

router.get("/jobs", async (req, res) => {
    const jobs = await Job.find()
    res.send(jobs);
})


module.exports = router;