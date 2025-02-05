import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch job details using ID (Replace with API call later)
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://api.adzuna.com/v1/api/jobs/in/${id}`);
        const data = await response.json();
        setJob(data); 
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold">{job.title}</h2>
      <p className="text-gray-600 mt-2">{job.company.display_name}</p>
      <p className="text-gray-600 mt-1">📍 {job.location.display_name}</p>
      <p className="mt-4">{job.description}</p>

      {job.salary_min && (
        <p className="mt-2">
          💰 Salary: {job.salary_min} - {job.salary_max} {job.currency}
        </p>
      )}

      <button
        onClick={() => window.open(job.redirect_url, "_blank")}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
