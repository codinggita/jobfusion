const SavedResume = require("../models/savedResumeModel");

// ✅ Save a Resume (Avoiding Duplicates Based on Title and Data)
const saveResume = async (req, res) => {
  try {
    const { email, resumeData, title } = req.body;
    if (!email || !resumeData || !title || !resumeData.templateId) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    // Check if the resume with this title already exists for the user
    const existingResume = await SavedResume.findOne({ email, title });
    if (existingResume) {
      return res.status(400).json({ success: false, message: "Resume with this title already exists" });
    }

    // Save the resume
    const newResume = new SavedResume({ email, resumeData, title, templateId: resumeData.templateId });
    await newResume.save();

    res.status(201).json({ success: true, message: "Resume saved successfully", data: newResume });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving resume", error: error.message });
  }
};

// ✅ Retrieve All Saved Resumes for a User
const getSavedResumes = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const savedResumes = await SavedResume.find({ email }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: savedResumes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching saved resumes", error: error.message });
  }
};

// ✅ Unsave (Delete) a Resume
const unsaveResume = async (req, res) => {
  try {
    const { email, resumeId } = req.body;

    if (!email || !resumeId) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    // Remove the saved resume
    const result = await SavedResume.findOneAndDelete({ email, _id: resumeId });

    if (!result) {
      return res.status(404).json({ success: false, message: "Resume not found in saved list" });
    }

    res.status(200).json({ success: true, message: "Resume removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error removing resume", error: error.message });
  }
};

module.exports = { saveResume, getSavedResumes, unsaveResume };