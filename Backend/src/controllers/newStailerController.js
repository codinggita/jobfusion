const NewStailer = require('../models/NewStailer');

// Add a new stailer
const addNewStailer = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const newStailer = new NewStailer({ email });
    await newStailer.save();

    res.status(201).json({ success: true, message: "New stailer added", data: newStailer });
  } catch (error) {
    console.error("Error adding stailer:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// Get all new stailers
const getAllNewStailers = async (req, res) => {
  try {
    const stailers = await NewStailer.find();
    res.status(200).json({ success: true, data: stailers });
  } catch (error) {
    console.error("Error fetching stailers:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

module.exports = { addNewStailer, getAllNewStailers };
