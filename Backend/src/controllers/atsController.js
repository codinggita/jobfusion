const pdfParse = require("pdf-parse");
const fs = require("fs");

// Advanced ATS scoring and analysis
const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Read and parse the uploaded PDF
    const fileData = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(fileData);
    const pdfText = pdfData.text.toLowerCase();
    const numPages = pdfData.numpages;

    // Delete file after processing
    fs.unlinkSync(req.file.path);

    // ATS Scoring Logic
    let score = 0;
    let suggestions = [];

    // 1. Keyword Matching (Job-Specific) - 25 points
    const jobKeywords = {
      "software developer": [
        "javascript", "react", "node.js", "python", "sql", "git", "api", "typescript", "html", "css",
        "software development", "agile", "scrum", "debugging", "testing"
      ],
      "generic": ["teamwork", "communication", "problem-solving", "leadership"]
    };
    const allKeywords = [...jobKeywords["software developer"], ...jobKeywords["generic"]];
    const matchedKeywords = allKeywords.filter(word => pdfText.includes(word));
    const keywordScore = Math.min((matchedKeywords.length / allKeywords.length) * 25, 25);
    score += keywordScore;
    if (matchedKeywords.length < 5) {
      suggestions.push(`Add more job-specific keywords like: ${allKeywords.slice(0, 5).join(", ")}. Found only ${matchedKeywords.length}.`);
    } else {
      suggestions.push(`Good use of keywords: ${matchedKeywords.slice(0, 3).join(", ")} and more.`);
    }

    // 2. Section Detection - 25 points
    const sections = {
      experience: pdfText.includes("experience") || pdfText.includes("work history"),
      education: pdfText.includes("education") || pdfText.includes("degree"),
      skills: pdfText.includes("skills") || pdfText.includes("abilities"),
      projects: pdfText.includes("projects") || pdfText.includes("portfolio")
    };
    const sectionScore = (Object.values(sections).filter(Boolean).length / 4) * 25;
    score += sectionScore;
    if (!sections.experience) suggestions.push("Include an 'Experience' or 'Work History' section with specific roles and dates.");
    if (!sections.education) suggestions.push("Add an 'Education' section with your degree and institution.");
    if (!sections.skills) suggestions.push("Include a 'Skills' section listing technical and soft skills.");
    if (!sections.projects) suggestions.push("Consider adding a 'Projects' section to showcase your work.");

    // 3. Quantifiable Achievements - 15 points
    const achievementPatterns = [/(\d+\%|\d+\+|\$\d+)/g, /\b(increased|reduced|improved|delivered|saved)\b/g];
    const achievements = pdfText.match(achievementPatterns[0]) || [];
    const actionVerbs = pdfText.match(achievementPatterns[1]) || [];
    const achievementScore = Math.min((achievements.length + actionVerbs.length) * 3, 15);
    score += achievementScore;
    if (achievements.length < 2) {
      suggestions.push("Add quantifiable achievements (e.g., 'Increased sales by 20%', 'Managed 5+ projects').");
    }

    // 4. Length and Readability - 15 points
    const wordCount = pdfText.split(/\s+/).length;
    const lengthScore = numPages === 1 && wordCount > 150 && wordCount < 600 ? 15 :
                        numPages === 2 && wordCount > 300 && wordCount < 800 ? 15 : 5;
    score += lengthScore;
    if (wordCount < 150) suggestions.push("Resume is too short. Aim for 150-600 words for a 1-page resume.");
    if (wordCount > 800) suggestions.push("Resume is too long. Keep it concise, ideally 1-2 pages (300-800 words).");
    if (numPages > 2) suggestions.push("Resume exceeds 2 pages. ATS prefers 1-2 pages for readability.");

    // 5. Formatting Consistency - 10 points
    const bulletPoints = pdfText.split(/[-•*]/).length - 1;
    const formattingScore = bulletPoints > 5 ? 10 : 5;
    score += formattingScore;
    if (bulletPoints < 5) suggestions.push("Use more bullet points (e.g., '-', '•') for better ATS readability.");

    // 6. Contact Information - 10 points
    const hasEmail = /\b[\w\.-]+@[\w\.-]+\.\w+\b/.test(pdfText);
    const hasPhone = /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(pdfText);
    const contactScore = (hasEmail ? 5 : 0) + (hasPhone ? 5 : 0);
    score += contactScore;
    if (!hasEmail) suggestions.push("Include a professional email address.");
    if (!hasPhone) suggestions.push("Add a phone number for contact.");

    // Normalize score to 0-100
    score = Math.round(score);

    // Final Response
    res.json({
      success: true,
      atsScore: score,
      suggestions: suggestions.length > 0 ? suggestions : ["Your resume is well-optimized for ATS!"],
      details: {
        matchedKeywords: matchedKeywords,
        wordCount: wordCount,
        pageCount: numPages
      }
    });
  } catch (error) {
    console.error("Error processing resume:", error);
    res.status(500).json({ success: false, message: "Error processing resume" });
  }
};

module.exports = { analyzeResume };