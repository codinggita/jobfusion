// 1.Used useRef for caching:
// -> jobsCache.current acts as a memory cache for job data.
// -> This avoids refetching when navigating between pages — only fetching once unless the page fully reloads.
// -> Faster because it skips repeated API calls.

// 2.Reduced state updates:
// -->setJobs only gets called when data is actually fetched.
// -->No unnecessary state updates on every navigation, avoiding extra re-renders.
// -->Simplified environment variable access:

// 3.Destructured import.meta.env for cleaner and more efficient variable use.
// -->Optimized API call logic:

// 4.API only gets called if no cache exists — saves bandwidth and speeds up perceived performance.
// -->Passed fetchTrendingJobs directly to onToggle:
// -->Avoided an extra function wrapper — keeping it simple and efficient.


import React, { useState, useEffect, useRef } from "react";
import { Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "./SaveBtn";
import axios from "axios";

const JobCard = ({ job, onToggle }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer relative">
      <div className="absolute top-4 right-4">
        <BookmarkButton job={job} onToggle={onToggle} />
      </div>
      <div
        onClick={() => navigate(`/jobs/${job.id}`, { state: { job } })}
        className="flex flex-col"
      >
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
          <Database className="text-white" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
        {job.company && (
          <p className="text-gray-600 text-sm mb-2">{job.company.display_name}</p>
        )}
        {job.location && (
          <p className="text-gray-600 text-sm mb-2">📍 {job.location.display_name}</p>
        )}
      </div>
    </div>
  );
};

const TrendingJobs = () => {
  const [jobs, setJobs] = useState([]);
  const jobsCache = useRef(null); // Memoize API response

  const fetchTrendingJobs = async () => {
    if (jobsCache.current) return setJobs(jobsCache.current); // Use cached data if available

    try {
      const { VITE_ADZUNA_API_ID, VITE_ADZUNA_API_KEY } = import.meta.env;
      const response = await axios.get("https://api.adzuna.com/v1/api/jobs/in/search/1", {
        params: {
          app_id: VITE_ADZUNA_API_ID,
          app_key: VITE_ADZUNA_API_KEY,
          results_per_page: 8,
        },
      });

      jobsCache.current = response.data.results; // Cache the results
      setJobs(response.data.results);
    } catch (error) {
      console.error("Error fetching trending jobs:", error);
    }
  };

  useEffect(() => {
    if (!jobsCache.current) fetchTrendingJobs();
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Fast-Track Job Openings in India
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onToggle={fetchTrendingJobs} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingJobs;