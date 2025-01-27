require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jobRoutes = require('./src/routes/jobRoutes');
const userRoutes = require('./src/routes/userRoutes'); // Add this line to import the user routes
const { getTrendingJobs } = require('./src/controllers/jobController');

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URI; // Use MONGO_URI as per your preference
    const conn = await mongoose.connect(mongoURL, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Call the function to connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Use job routes
app.use('/api/jobs', jobRoutes);

// Use user routes for creating a new user (important!)
app.use('/api/users', userRoutes); // Add this line to use user routes

// Separate route for trending jobs
app.get('/api/trending', getTrendingJobs);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
