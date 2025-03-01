import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const JobDetails = () => {
  window.scrollTo(0, 0);
  const location = useLocation();
  const job = location.state?.job;

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFCFE]">
        <p className="text-[#5A78B1] text-xl font-medium">Job details are not available. Please navigate from the trending jobs page.</p>
      </div>
    );
  }

  // Enhanced function to format job descriptions with 10-word minimum per line
  const formatDescription = (description) => {
    if (!description) return 'No description available.';

    // Define common section headers
    const sectionHeaders = {
      'What you’ll do': '### Responsibilities',
      'Key Responsibilities': '### Responsibilities',
      'Requirements': '### Requirements',
      'Who you are': '### Ideal Candidate',
      'Qualifications': '### Qualifications',
      'Experience': '### Experience',
      'Key Skills': '### Key Skills',
      'Benefits': '### Benefits',
      'About Us': '### About the Company',
      'Company Overview': '### About the Company',
      'Responsibilities': '### Responsibilities',
      'Mission': '### Mission',
      'Vision': '### Vision',
      'Job Description': '### Job Description',
      'Lightning Job by Cutshort': '### Job Description',
    };

    let formattedText = description;

    // Replace section headers with markdown headers
    Object.entries(sectionHeaders).forEach(([key, value]) => {
      const regex = new RegExp(`(${key})[\\s:]*`, 'gi');
      formattedText = formattedText.replace(regex, `\n\n${value}\n`);
    });

    // Preserve existing bullets and handle full-stop splitting, enforcing 10-word minimum
    formattedText = formattedText
      .replace(/\.\.\.$/, '') // Remove trailing "..." at the end
      .split('\n')
      .map((line) => {
        if (line.trim().length === 0 || line.startsWith('#')) return line;

        // Check if the line already starts with a bullet (•)
        if (line.trim().startsWith('•')) {
          const cleanedLine = line.trim().replace(/^•\s*/, '').trim();
          const words = cleanedLine.split(/\s+/).filter(word => word.length > 0);
          if (words.length < 10) return ''; // Eliminate if less than 10 words
          return `- ${cleanedLine}`;
        }

        // For non-bulleted lines, split by full stops and filter for 10+ words
        const sentences = line
          .split(/(?<=\.)\s+/)
          .filter((s) => s.trim().length > 0)
          .map((s) => s.trim())
          .filter((sentence) => {
            const words = sentence.split(/\s+/).filter(word => word.length > 0);
            return words.length >= 10; // Keep only sentences with 10+ words
          });

        if (sentences.length > 0) {
          return sentences.map((sentence) => `- ${sentence}`).join('\n');
        }
        return ''; // Eliminate if no valid sentences
      })
      .filter(line => line.trim().length > 0) // Remove empty lines
      .join('\n');

    // Limit to 10 lines (counting bullets and headers)
    const lines = formattedText.split('\n').filter((line) => line.trim().length > 0);
    if (lines.length > 10) {
      formattedText = lines.slice(0, 10).join('\n') + '\n*(Description truncated. See full details on application page.)';
    }

    return formattedText;
  };

  return (
    <div className="min-h-screen bg-[#FCFCFE] py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6 border border-[#688BC5]/20">
        {/* Job Header */}
        <div className="border-b border-[#688BC5]/30 pb-4">
          <h2 className="text-2xl font-bold text-[#5A78B1]">{job.title}</h2>
          {job.company && (
            <p className="text-md text-gray-800 mt-1">{job.company.display_name}</p>
          )}
          {job.location && (
            <p className="mt-2 text-md">
              <span className="text-[#5A78B1] font-semibold">Location :</span>
              <span className="text-[#688BC5] font-medium ml-1">{job.location.display_name}</span>
            </p>
          )}
        </div>

        {/* Job Description */}
        <div className="mt-4 text-gray-700">
          <ReactMarkdown
            className="prose prose-gray max-w-none"
            remarkPlugins={[remarkGfm]}
            rehypePlugins=[{rehypeRaw}]
            components={{
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-semibold text-[#5A78B1] mt-4 mb-2" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 text-gray-700" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-2" {...props} />
              ),
            }}
          >
            {formatDescription(job.description)}
          </ReactMarkdown>
        </div>

        {/* Apply Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => window.open(job.redirect_url, '_blank')}
            className="bg-[#688BC5] text-white px-6 py-2 rounded-full hover:bg-[#5A78B1] transition-colors duration-200"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;