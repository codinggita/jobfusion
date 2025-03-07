import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  // Scroll to top when entering the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Optional: Manual back button
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFCFE] animate-fade-in">
        <p className="text-[#5A78B1] text-xl font-medium">
          Job details are not available. Please navigate from the trending jobs page.
        </p>
      </div>
    );
  }

  const formatDescription = (description) => {
    // Your existing formatDescription function (unchanged)
    if (!description) return 'No description available.';
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
    Object.entries(sectionHeaders).forEach(([key, value]) => {
      const regex = new RegExp(`(${key})[\\s:]*`, 'gi');
      formattedText = formattedText.replace(regex, `\n\n${value}\n`);
    });

    formattedText = formattedText
      .replace(/\.\.\.$/, '')
      .split('\n')
      .map((line) => {
        if (line.trim().length === 0 || line.startsWith('#')) return line;
        if (line.trim().startsWith('•')) {
          const cleanedLine = line.trim().replace(/^•\s*/, '').trim();
          const words = cleanedLine.split(/\s+/).filter(word => word.length > 0);
          if (words.length < 10) return '';
          return `- ${cleanedLine}`;
        }
        const sentences = line
          .split(/(?<=\.)\s+/)
          .filter((s) => s.trim().length > 0)
          .map((s) => s.trim())
          .filter((sentence) => {
            const words = sentence.split(/\s+/).filter(word => word.length > 0);
            return words.length >= 10;
          });
        if (sentences.length > 0) {
          return sentences.map((sentence) => `- ${sentence}`).join('\n');
        }
        return '';
      })
      .filter(line => line.trim().length > 0)
      .join('\n');

    const lines = formattedText.split('\n').filter((line) => line.trim().length > 0);
    if (lines.length > 10) {
      formattedText = lines.slice(0, 10).join('\n') + '\n*(Description truncated. See full details on application page.)';
    }

    return formattedText;
  };

  return (
    <div className="min-h-screen bg-[#FCFCFE] py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center animate-fade-in">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6 border border-[#688BC5]/20 transform transition-all duration-300 hover:shadow-xl">
        {/* Optional Back Button */}
        <button
          onClick={handleGoBack}
          className="mb-4 text-[#5A78B1] hover:underline flex items-center"
        >
          ← Back
        </button>

        {/* Job Header */}
        <div className="border-b border-[#688BC5]/30 pb-4">
          <h2 className="text-2xl font-bold text-[#5A78B1] tracking-tight animate-slide-up">{job.title}</h2>
          {job.company && (
            <p className="text-md text-gray-800 mt-1 font-semibold animate-slide-up-delayed">{job.company.display_name}</p>
          )}
          {job.location && (
            <p className="mt-2 text-md">
              <span className="text-[#5A78B1] font-semibold animate-slide-up-delayed">Location :</span>
              <span className="text-[#688BC5] font-medium ml-1 animate-slide-up-delayed">
                {job.location.display_name}
              </span>
            </p>
          )}
        </div>

        {/* Job Description */}
        <div className="mt-4 text-gray-700">
          <ReactMarkdown
            className="prose prose-gray max-w-none"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-semibold text-[#5A78B1] mt-4 mb-2 flex items-center animate-fade-in-delayed" {...props}>
                  <span className="w-2 h-2 bg-[#688BC5] rounded-full mr-2"></span>
                  {props.children}
                </h3>
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 text-gray-700 animate-fade-in-delayed" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-2 animate-fade-in-delayed" {...props} />
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
            className="bg-[#688BC5] text-white px-6 py-2 rounded-full hover:bg-[#5A78B1] transition-all duration-300 transform hover:scale-105 animate-bounce-in"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Existing styles (unchanged)
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