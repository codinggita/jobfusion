const Review = require("../models/reviewModel");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

const postReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json({ message: "Review saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save review" });
  }
};

module.exports = { getReviews, postReview };