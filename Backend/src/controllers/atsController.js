const pdfParse = require("pdf-parse");
const fs = require("fs");

// Extract text and calculate ATS score
const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Read and parse the uploaded PDF
    const fileData = fs.readFileSync(req.file.path);
    const pdfText = (await pdfParse(fileData)).text.toLowerCase();

    // Delete file after processing
    fs.unlinkSync(req.file.path);

    // ATS Scoring Logic
    let score = 0;
    let feedback = [];

    const keywords = ["software", "developer", "engineer", "javascript", "react", "node.js"];
    let keywordMatch = keywords.filter(word => pdfText.includes(word)).length;

    if (keywordMatch >= 3) {
      score += 30;
    } else {
      feedback.push("Include more relevant job-related keywords.");
    }

    if (pdfText.includes("experience")) score += 20;
    else feedback.push("Add an 'Experience' section.");

    if (pdfText.includes("education")) score += 20;
    else feedback.push("Include an 'Education' section.");

    if (pdfText.includes("skills")) score += 20;
    else feedback.push("Add a 'Skills' section.");

    if (pdfText.length > 200) score += 10;
    else feedback.push("Your resume seems too short, consider adding more details.");

    res.json({ success: true, atsScore: score, suggestions: feedback });
  } catch (error) {
    console.error("Error processing resume:", error);
    res.status(500).json({ success: false, message: "Error processing resume" });
  }
};

module.exports = { analyzeResume };
