import { Link } from "react-router-dom"; // Ensure React Router is installed for routing
import { PlayCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-[#F7F7F7] text-gray-800 min-h-screen flex flex-col items-center px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl text-center">
        <img 
          src="../../public/IMG@1x.png" 
          alt="Career Success" 
          className="w-full mb-6 shadow-lg rounded-xl" 
        />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Your Gateway to Career Success With <span className="text-[#3B82F6]">JobFusion</span>
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Unlock your potential with JobFusion – Your trusted partner in finding genuine career opportunities. Discover jobs that align with your skills, build resumes that stand out, and take control of your career journey today.
        </p>
        {/* Buttons */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/register">
            <button className="bg-[#3B82F6] hover:bg-[#2563EB] px-6 py-3 rounded-lg text-white font-semibold">
              Get Started With JobFusion
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        <FeatureCard
          title="Jobs Availability"
          description="JobFusion connects you with opportunities that truly fit your skills, experience, and aspirations. No more guessing — just real, meaningful career options."
        />
        <FeatureCard
          title="Resume Builder"
          description="Craft a resume that speaks for you. With JobFusion’s easy-to-use builder, you can create a professional resume that highlights your strengths and makes you stand out to employers in just a few simple steps."
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-[#E8F1F9] text-black p-8 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#3B82F6] flex flex-col items-center justify-center space-y-4">
      <h3 className="text-xl md:text-2xl font-semibold text-center text-[#333333]">{title}</h3>
      <p className="text-gray-700 text-center">{description}</p>
    </div>
  );
}
