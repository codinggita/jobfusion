import React from 'react';
import { useLocation } from 'react-router-dom';

const JobDetails = () => {
  const location = useLocation();
  const job = location.state?.job;

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-6">
        <p>Job details are not available. Please navigate from the trending jobs page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
      {job.company && (
        <p className="text-gray-600 mb-2">{job.company.display_name}</p>
      )}
      {job.location && (
        <p className="text-gray-600 mb-2">
          📍 {job.location.display_name}
        </p>
      )}
      {job.salary_min && job.salary_max && (
        <p className="mb-2">
          💰 Salary: {job.salary_min} - {job.salary_max} {job.currency}
        </p>
      )}
      <div className="mt-4">
        <p>{job.description}</p>
      </div>
      <button
        onClick={() => window.open(job.redirect_url, '_blank')}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
