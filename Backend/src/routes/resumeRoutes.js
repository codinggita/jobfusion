const express = require("express");
const router = express.Router();
const { saveResume, getSavedResumes, unsaveResume } = require("../controllers/resumeController");

router.post("/save", saveResume);
router.get("/saved/:email", getSavedResumes);
router.delete("/unsave", unsaveResume);

module.exports = router;