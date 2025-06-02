const SavedJob = require("../models/savedJobModel");
const User = require("../models/User");

// Save a Job
const saveJob = async (req, res) => {
  try {
    const { email, jobData } = req.body;
    
    if (!email || !jobData) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and job data are required" 
      });
    }

    // Check if job already exists
    const existingJob = await SavedJob.findOne({ 
      email, 
      'jobData.id': jobData.id 
    });

    if (existingJob) {
      return res.status(400).json({ 
        success: false, 
        message: "Job already saved" 
      });
    }

    // Create new saved job
    const newJob = new SavedJob({ 
      email, 
      jobData 
    });
    await newJob.save();

    res.status(201).json({ 
      success: true, 
      message: "Job saved successfully" 
    });

  } catch (error) {
    console.error('Error in saveJob:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error saving job", 
      error: error.message 
    });
  }
};

// Get Saved Jobs
const getSavedJobs = async (req, res) => {
  try {
    const { email } = req.params;
    console.log('Getting saved jobs for email:', email);
    console.log('User from token:', req.user);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    // Verify user from token matches requested email
    if (!req.user || req.user.email !== email) {
      console.log('Auth mismatch - Token user:', req.user?.email, 'Requested email:', email);
      return res.status(403).json({
        success: false,
        message: "Not authorized to access these saved jobs"
      });
    }

    const savedJobs = await SavedJob.find({ email })
      .sort({ createdAt: -1 });
    
    if (!savedJobs || savedJobs.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No saved jobs found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: savedJobs,
      message: "Saved jobs retrieved successfully"
    });

  } catch (error) {
    console.error('Error in getSavedJobs:', error);
    res.status(500).json({
      success: false,
      message: "Error retrieving saved jobs",
      error: error.message
    });
  }
};

// Unsave a Job
const unsaveJob = async (req, res) => {
  try {
    const { email, jobId } = req.body;

    if (!email || !jobId) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and job ID are required" 
      });
    }

    const result = await SavedJob.findOneAndDelete({ 
      email, 
      'jobData.id': jobId 
    });

    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: "Job not found in saved list" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Job removed successfully" 
    });

  } catch (error) {
    console.error('Error in unsaveJob:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error removing job", 
      error: error.message 
    });
  }
};

module.exports = { saveJob, getSavedJobs, unsaveJob };