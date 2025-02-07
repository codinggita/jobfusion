const express = require("express");
const { saveJob, getSavedJobs } = require("../controllers/savedJobController");

const router = express.Router();

router.post("/save", saveJob); // Save a job
router.get("/saved/:email", getSavedJobs); // Get saved jobs by email

module.exports = router;
