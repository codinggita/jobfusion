require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jobRoutes = require('./src/routes/jobRoutes');
const userRoutes = require('./src/routes/userRoutes'); // Import user routes
const { getTrendingJobs } = require('./src/controllers/jobController');
const savedJobRoutes = require("./src/routes/savedJobRoutes");

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URI; // Use MONGO_URI as per your preference
    const conn = await mongoose.connect(mongoURL); // Removed deprecated options
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

// CORS configuration
const corsOptions = {
  origin: '*',  // Replace with your deployed frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
};

app.use(cors(corsOptions));  // Apply CORS middleware with the options
app.use(express.json());

// Use job routes
app.use('/api/jobs', jobRoutes);

// Use user routes for registration and login
app.use('/api/users', userRoutes);

// Separate route for trending jobs
app.get('/api/trending', getTrendingJobs);

//Save Jobs Rotes 
app.use("/api/jobs", savedJobRoutes);

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
