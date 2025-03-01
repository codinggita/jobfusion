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

  // Enhanced function to format job descriptions with full-stop splitting and line limit
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

    // Split by full stops and convert into bullet points
    formattedText = formattedText
      .replace(/(\d+\.\s+)/g, '\n- ') // Handle numbered lists
      .replace(/(Exp:|Experience:)\s*/gi, '\n### Experience\n')
      .replace(/(Key Skills:)\s*/gi, '\n### Key Skills\n')
      .replace(/\.\.\.$/, '') // Remove trailing "..." at the end
      .split('\n')
      .map((line) => {
        if (line.trim().length === 0 || line.startsWith('#')) return line;

        const sentences = line
          .split(/(?<=\.)\s+/)
          .filter((s) => s.trim().length > 0)
          .map((s) => s.trim());

        if (sentences.length > 1 || !line.startsWith('-')) {
          return sentences.map((sentence) => `- ${sentence}`).join('\n');
        }
        return line;
      })
      .join('\n');

    // Limit to 10 lines (counting bullets and headers)
    const lines = formattedText.split('\n').filter((line) => line.trim().length > 0);
    if (lines.length > 10) {
      formattedText = lines.slice(0, 10).join('\n') + '\n*(Description truncated. See full details on application page.)';
    }

    return formattedText;
  };

  return (
    <div className="min-h-screen bg-[#FCFCFE] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8 border border-[#688BC5]/20 transform transition-all duration-300 hover:shadow-xl">
        {/* Job Header */}
        <div className="border-b border-[#688BC5]/30 pb-5 animate-fade-in">
          <h2 className="text-3xl font-extrabold text-[#5A78B1] tracking-tight animate-slide-up">{job.title}</h2>
          {job.company && (
            <p className="text-lg text-gray-800 mt-2 font-semibold animate-slide-up-delayed">{job.company.display_name}</p>
          )}
          {job.location && (
            <p className="mt-2 text-lg flex items-center">
              <span className="text-[#5A78B1] font-bold mr-2">Location :</span>
              <span className="text-[#688BC5] font-medium">
                {job.location.display_name}
              </span>
            </p>
          )}
        </div>

        {/* Job Description */}
        <div className="mt-6 text-gray-700">
          <ReactMarkdown
            className="prose prose-gray max-w-none"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h3: ({ node, ...props }) => (
                <h3 className="text-xl font-bold text-[#5A78B1] mt-6 mb-3 flex items-center animate-fade-in-delayed" {...props}>
                  <span className="w-2 h-2 bg-[#688BC5] rounded-full mr-2"></span>
                  {props.children}
                </h3>
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 text-gray-700" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-3 text-lg" {...props} />
              ),
            }}
          >
            {formatDescription(job.description)}
          </ReactMarkdown>
        </div>

        {/* Apply Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.open(job.redirect_url, '_blank')}
            className="bg-[#688BC5] text-white px-8 py-3 rounded-full shadow-md hover:bg-[#5A78B1] transition-all duration-300 transform hover:scale-105 text-lg font-semibold animate-bounce-in"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Add CSS for animations (if not using Tailwind's built-in animations)
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideUpDelayed {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes fadeInDelayed {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes bounceIn {
    0% { transform: scale(0.9); opacity: 0; }
    50% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); }
  }
  .animate-fade-in { animation: fadeIn 0.6s ease-in-out; }
  .animate-slide-up { animation: slideUp 0.6s ease-in-out; }
  .animate-slide-up-delayed { animation: slideUpDelayed 0.6s ease-in-out 0.2s backwards; }
  .animate-fade-in-delayed { animation: fadeInDelayed 0.6s ease-in-out 0.4s backwards; }
  .animate-bounce-in { animation: bounceIn 0.6s ease-in-out; }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

export default JobDetails;