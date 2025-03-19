import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ExperienceCard from '../components/ExperienceCard';

const SuccessStories = () => {
    const [experienceData, setExperienceData] = useState([]);

    useEffect(()=>{
        (async()=>{
            const response = await axios.get("http://localhost:5000/api/experience/experiences");
            const data = await response.data;
            console.log(data.data);
            setExperienceData(data.data);
        })()
    })

    return (
        <div className="min-h-screen bg-gray-50 p-8 md:p-12 lg:p-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Developer Journeys</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {experienceData.map((experience) => (
                <ExperienceCard key={experience._id} experience={experience} />
              ))}
            </div>
          </div>
        </div>
      );
}

export default SuccessStories