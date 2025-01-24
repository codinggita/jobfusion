const axios = require('axios');

// Load environment variables
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID; // Your app ID from .env
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY; // Your app key from .env

const searchJobs = async (req, res) => {
  const { what, where, salary_min, full_time, permanent, sort_by, results_per_page } = req.query;

  const url = `http://api.adzuna.com/v1/api/jobs/gb/search/1`;

  const params = {
    app_id: ADZUNA_APP_ID,
    app_key: ADZUNA_APP_KEY,
    what: what || 'javascript developer',
    where: where || 'london',
    salary_min: salary_min || 0,
    full_time: full_time || 1,
    permanent: permanent || 1,
    sort_by: sort_by || 'salary',
    results_per_page: results_per_page || 20,
    'content-type': 'application/json'
  };

  try {
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Adzuna API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch data from Adzuna API', details: error.response ? error.response.data : error.message });
  }
};

const getTrendingJobs = async (req, res) => {
    const url = `http://api.adzuna.com/v1/api/jobs/gb/search/1`;
    const params = {
      app_id: ADZUNA_APP_ID,
      app_key: ADZUNA_APP_KEY,
      results_per_page: 5, // Fetch 50 jobs
    };
  
    try {
      const response = await axios.get(url, { params });
      const jobs = response.data.results;
  
      if (!jobs || jobs.length === 0) {
        return res.status(200).json({
          success: true,
          data: [],
          message: "No jobs found in the data",
        });
      }
  
      // Find the job(s) with the highest count
      let maxCount = -Infinity;
      const highestVacancyJobs = [];
  
      jobs.forEach((job) => {
        const count = job.vacancy_count || 0; // Get the vacancy count for the job
        if (count > maxCount) {
          maxCount = count; // Update max count
          highestVacancyJobs.length = 0; // Clear previous results
          highestVacancyJobs.push(job); // Add the current job
        } else if (count === maxCount) {
          highestVacancyJobs.push(job); // Add to results if count matches max
        }
      });
  
      // Return the job(s) with the highest count
      res.status(200).json({
        success: true,
        data: highestVacancyJobs,
      });
    } catch (error) {
      console.error("Error fetching trending jobs:", error.message);
      res.status(500).json({
        success: false,
        message: "Error fetching trending jobs",
        error: error.message,
      });
    }
  };
  

module.exports = {
  searchJobs,
  getTrendingJobs,
};
