import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const JobDetails = () => {
  window.scrollTo(0, 0);
  const location = useLocation();
  const job = location.state?.job;

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-6">
        <p>Job details are not available. Please navigate from the trending jobs page.</p>
      </div>
    );
  }

  // Function to format job descriptions intelligently
  const formatDescription = (description) => {
    if (!description) return '';

    // Define keywords to segment the description into key sections
    const keywords = [
      { key: 'What you’ll do', title: '### 🔹 Responsibilities' },
      { key: 'Key Responsibilities', title: '### 🔹 Responsibilities' },
      { key: 'Requirements', title: '### 🔹 Requirements' },
      { key: 'Who you are', title: '### 🔹 Ideal Candidate' },
      { key: 'Benefits', title: '### 🔹 Benefits' },
      { key: 'Company Overview', title: '### 🔹 About the Company' },
      { key: 'About Us', title: '### 🔹 About the Company' },
    ];

    // Split description into sections using keywords
    let formattedText = description;
    keywords.forEach(({ key, title }) => {
      formattedText = formattedText.replace(new RegExp(key, 'gi'), `\n\n${title}\n\n`);
    });

    // Convert normal sentences into bullet points
    formattedText = formattedText
      .split(/(?<=\.)\s+/) // Split by period+space
      .map((sentence) => `- ${sentence.trim()}`)
      .join('\n');

    return formattedText;
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
      {job.company && (
        <p className="text-gray-600 mb-2">{job.company.display_name}</p>
      )}
      {job.location && (
        <p className="text-gray-600 mb-2">📍 {job.location.display_name}</p>
      )}
      {job.salary_min && job.salary_max && (
        <p className="mb-2">
          💰 Salary: {job.salary_min} - {job.salary_max} {job.currency}
        </p>
      )}

      {/* Job Description Section */}
      <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow">
        <ReactMarkdown className="prose prose-lg" remarkPlugins={[remarkGfm]}>
          {formatDescription(job.description)}
        </ReactMarkdown>
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
