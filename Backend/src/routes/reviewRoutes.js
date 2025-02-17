const express = require("express");
const { getReviews, postReview } = require("../controllers/reviewController");
const router = express.Router();

router.get("/", getReviews);
router.post("/", postReview);

module.exports = router;