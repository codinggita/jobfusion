  require('dotenv').config(); // Load environment variables from .env file
  const express = require('express');
  const cors = require('cors'); // Import CORS
  const jobRoutes = require('./src/routes/jobRoutes'); // Import job routes

  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(cors()); // Enable CORS
  app.use(express.json());

  // Use job routes
  app.use('/api/jobs', jobRoutes);

  // Start the server
  app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
  });