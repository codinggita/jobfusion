const SavedJob = require("../models/savedJobModel");

// ✅ Save a Job (Avoiding Duplicates)
const saveJob = async (req, res) => {
  try {
    const { email, jobData } = req.body;
    if (!email || !jobData || !jobData.id) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    // Check if the job is already saved by the user
    const existingJob = await SavedJob.findOne({ email, "jobData.id": jobData.id });
    if (existingJob) {
      return res.status(400).json({ success: false, message: "Job already saved" });
    }

    // Save the job
    const newJob = new SavedJob({ email, jobData });
    await newJob.save();

    res.status(201).json({ success: true, message: "Job saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving job", error: error.message });
  }
};

// ✅ Retrieve All Saved Jobs for a User
const getSavedJobs = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const savedJobs = await SavedJob.find({ email });
    res.status(200).json({ success: true, data: savedJobs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching saved jobs", error: error.message });
  }
};

// ✅ Unsave a Job
const unsaveJob = async (req, res) => {
  try {
    const { email, jobId } = req.body;

    if (!email || !jobId) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    // Remove the saved job
    const result = await SavedJob.findOneAndDelete({ email, "jobData.id": jobId });

    if (!result) {
      return res.status(404).json({ success: false, message: "Job not found in saved list" });
    }

    res.status(200).json({ success: true, message: "Job unsaved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error unsaving job", error: error.message });
  }
};

module.exports = { saveJob, getSavedJobs, unsaveJob };