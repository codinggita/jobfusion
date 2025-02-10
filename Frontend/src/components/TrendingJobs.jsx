import React, { useState, useEffect } from "react";
import { Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "./SaveBtn"; // Updated button component
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
      </div>
    </div>
  );
};

const TrendingJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchTrendingJobs = async () => {
    try {
      const ADZUNA_API_ID = import.meta.env.VITE_ADZUNA_API_ID;
      const ADZUNA_API_KEY = import.meta.env.VITE_ADZUNA_API_KEY;

      const response = await axios.get(
        `https://api.adzuna.com/v1/api/jobs/in/search/1`,
        {
          params: {
            app_id: ADZUNA_API_ID,
            app_key: ADZUNA_API_KEY,
            results_per_page: 8,
          },
        }
      );

      setJobs(response.data.results);
    } catch (error) {
      console.error("Error fetching trending jobs:", error);
    }
  };

  useEffect(() => {
    fetchTrendingJobs();
  }, [refresh]);

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Fast-Track Job Openings in India
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onToggle={() => setRefresh((prev) => !prev)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingJobs;
