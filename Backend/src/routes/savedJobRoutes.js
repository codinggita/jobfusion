const express = require("express");
const { saveJob, getSavedJobs, unsaveJob } = require("../controllers/savedJobController");

const router = express.Router();

router.post("/save", saveJob); // Save a job
router.get("/saved/:email", getSavedJobs); // Get saved jobs by email
router.delete("/unsave", unsaveJob); // Unsave a job

module.exports = router;