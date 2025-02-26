const express = require("express");
const multer = require("multer");
const { analyzeResume } = require("../controllers/atsController");

const router = express.Router();

// Configure file upload
const upload = multer({ dest: "uploads/" });

// ATS Resume Checker Route
router.post("/ats-checker", upload.single("resume"), analyzeResume);


module.exports = router;
