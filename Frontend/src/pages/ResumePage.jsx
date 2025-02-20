import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MainSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      author: "Austin Distel",
      position: "Product Designer, Google"
    },
  ];

  const templates = [
    { 
      id: 1, 
      image: "https://www.resumebuilder.com/wp-content/uploads/2023/12/Homepage-10.png" 
    },
    { 
      id: 2, 
      image: "https://www.resumebuilder.com/wp-content/uploads/2023/12/Homepage-9-New-2.png" 
    },
    { 
      id: 3, 
      image: "https://www.resumebuilder.com/wp-content/uploads/2023/12/Homepage-8.png" 
    },
    { 
      id: 4, 
      image: "https://www.resumebuilder.com/wp-content/uploads/2023/12/Homepage-7-New-2.png" 
    },
  ];

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-100 to-white py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              Stand out with a professionally designed resume
            </h1>
            <p className="text-gray-600 text-lg">
              By employing the best practices and innovative tech, Resume Builder boosts
              your chances of landing a better job - completely for free.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
              Build Resume
            </button>
          </div>
          <div className="relative">
            <div className="absolute -right-4 top-0 z-10">
              <div className="bg-green-50 p-2 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black text-white p-6 rounded-lg">
                <h3 className="font-bold mb-4">FEATURE</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Personal Details</li>
                  <li>• Experience</li>
                  <li>• Education</li>
                  <li>• Skills</li>
                  <li>• Languages</li>
                  <li>• Certificates</li>
                  <li>• Summary</li>
                </ul>
              </div>
              <img
                src="https://www.resumebuilder.com/wp-content/uploads/2024/07/Parallax-1.png"
                alt="Resume builder interface"
                className="rounded-lg object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-4xl mx-auto relative">
          <button 
            onClick={() => setCurrentTestimonial(prev => prev > 0 ? prev - 1 : testimonials.length - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center px-12">
            <p className="text-gray-600 mb-6">{testimonials[currentTestimonial].text}</p>
            <h3 className="font-bold">{testimonials[currentTestimonial].author}</h3>
            <p className="text-sm text-gray-500">{testimonials[currentTestimonial].position}</p>
          </div>
          <button 
            onClick={() => setCurrentTestimonial(prev => prev < testimonials.length - 1 ? prev + 1 : 0)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Resume Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {templates.map((template) => (
              <div 
                key={template.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={`Resume template ${template.id}`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}