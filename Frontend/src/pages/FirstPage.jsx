import { PlayCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl text-center">
        <img src="../../public/IMG@1x.png" alt="Career Success" className="w-full mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold">Your Gateway to Career Success With <span className="text-blue-400">JobFusion</span></h1>
        <p className="mt-4 text-lg text-gray-400">
          Find high-demand jobs, build strong resumes, and track your career path
          with ease. Join thousands of professionals who've found their dream
          careers through JobFusion.
        </p>
        {/* Buttons */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold">
            🚀 Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <FeatureCard
          title="Smart Job Matching"
          description="AI-powered job recommendations based on your skills and experience"
        />
        <FeatureCard
          title="Resume Builder"
          description="Create professional resumes with our intuitive builder tool"
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-md text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}
