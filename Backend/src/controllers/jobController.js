const axios = require('axios');

// Load environment variables for Adzuna API
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID; // Your app ID from .env
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY; // Your app key from .env

/**
 * Search Jobs API
 * This API allows users to search for jobs based on various query parameters, such as job title, location, salary range, job type, and more.
 * It uses the Adzuna API to fetch job data, which is passed as query parameters to customize the search.
 * 
 * Query Parameters:
 * - `what`: Job title or keyword (default: 'javascript developer')
 * - `where`: Job location (default: 'london')
 * - `salary_min`: Minimum salary for the job (default: 0)
 * - `full_time`: Full-time job filter (default: 1 - true)
 * - `permanent`: Permanent job filter (default: 1 - true)
 * - `sort_by`: Sort jobs by specified criteria, e.g., 'salary' (default: 'salary')
 * - `results_per_page`: Number of jobs to fetch per page (default: 20)
 * 
 * Implementation:
 * - Builds a query using the parameters provided in the request.
 * - Sends a GET request to the Adzuna API with the query parameters.
 * - Returns the job data in the response.
 */
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

/**
 * Get Trending Jobs API
 * This API identifies jobs with the highest number of vacancies (vacancy count) from the Adzuna API data.
 * It helps users discover trending job roles with a high demand.
 * 
 * Implementation:
 * - Fetches a list of jobs from the Adzuna API.
 * - Iterates through the jobs to find the job(s) with the highest vacancy count.
 * - Returns the job(s) with the maximum vacancy count.
 */
const getTrendingJobs = async (req, res) => {
  const url = `http://api.adzuna.com/v1/api/jobs/gb/search/1`;
  const params = {
    app_id: ADZUNA_APP_ID,
    app_key: ADZUNA_APP_KEY,
    results_per_page: 50, // Fetch 50 jobs
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

/**
 * Get Random Jobs API
 * This API provides a random selection of jobs based on the requested count.
 * Users can specify the number of random jobs they want to retrieve.
 * 
 * Query Parameters:
 * - `count`: Number of random jobs to return (default: 6)
 * 
 * Implementation:
 * - Fetches a pool of 50 jobs from the Adzuna API.
 * - Randomizes the job list using a shuffle algorithm.
 * - Selects the desired number of jobs (specified by `count`) from the shuffled list.
 * - Returns the selected random jobs in the response.
 */
const getRandomJobs = async (req, res) => {
  const { count = 6 } = req.query; // Default to 6 random jobs if count is not provided

  const url = `http://api.adzuna.com/v1/api/jobs/gb/search/1`;
  const params = {
    app_id: ADZUNA_APP_ID,
    app_key: ADZUNA_APP_KEY,
    results_per_page: 50, // Fetch a large pool of jobs to randomize from
  };

  try {
    const response = await axios.get(url, { params });
    const jobs = response.data.results;

    // Shuffle the jobs array
    for (let i = jobs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [jobs[i], jobs[j]] = [jobs[j], jobs[i]];
    }

    // Select the desired number of random jobs
    const randomJobs = jobs.slice(0, Math.min(count, jobs.length));

    res.status(200).json({
      success: true,
      data: randomJobs,
    });
  } catch (error) {
    console.error('Error fetching random jobs:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching random jobs',
      error: error.message,
    });
  }
};

module.exports = {
  searchJobs,
  getTrendingJobs,
  getRandomJobs,
};
