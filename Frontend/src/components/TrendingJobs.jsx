import React, { useState, useEffect } from 'react';
import { Database } from 'lucide-react';

// Updated JobCard now displays both the job title and the number of vacancies.
const JobCard = ({ title, openings }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
      <Database className="text-white" />
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    {/* <p className="text-gray-600">Vacancies: {openings}</p> */}
  </div>
);

const TrendingJobs = () => {
  const [trendingJobs, setTrendingJobs] = useState([]);

  const fetchTrendingJobs = async () => {
    try {
      // Use Vite environment variables
      const ADZUNA_API_ID = import.meta.env.VITE_ADZUNA_API_ID;
      const ADZUNA_API_KEY = import.meta.env.VITE_ADZUNA_API_KEY;

      // Request 20 results from the API to have enough data for grouping.
      const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${ADZUNA_API_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=20`
      );
      const data = await response.json();

      // Group the job ads by job title and count the number of ads for each title.
      const groupedJobs = data.results.reduce((acc, job) => {
        const title = job.title;
        // If the title already exists in the accumulator, increment its count.
        if (acc[title]) {
          acc[title] += 1;
        } else {
          acc[title] = 1;
        }
        return acc;
      }, {});

      // Convert the grouped object into an array of objects.
      const jobsArray = Object.entries(groupedJobs).map(([title, count]) => ({
        title,
        openings: count
      }));

      // Sort the array in descending order by openings (vacancy count).
      jobsArray.sort((a, b) => b.openings - a.openings);

      // Select only the top 8 job roles.
      const topJobs = jobsArray.slice(0, 8);

      setTrendingJobs(topJobs);
    } catch (error) {
      console.error('Error fetching trending jobs:', error);
    }
  };

  useEffect(() => {
    fetchTrendingJobs();
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trending Job Roles in India
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingJobs;
