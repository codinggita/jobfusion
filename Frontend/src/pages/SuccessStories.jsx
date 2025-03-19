import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ExperienceCard from '../components/ExperienceCard';
import Spinner from '../components/Loader';
import { Plus } from 'lucide-react';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const SuccessStories = () => {
    const [experienceData, setExperienceData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const response = await axios.get("http://localhost:5000/api/experience/experiences");
            const data = await response.data;
            console.log(data.data);
            setExperienceData(data.data);
            setIsLoading(false)
            console.log("working")
        })()
    }, [])

    return (
        <>
            {
                isLoading ? <Spinner /> :
                    (
                        <div className="min-h-screen bg-gray-50 p-8 md:p-12 lg:p-16">
                            <div className="max-w-7xl mx-auto">
                                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Developer Journeys</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                                    {experienceData.map((experience) => (
                                        <ExperienceCard key={experience._id} experience={experience} />
                                    ))}
                                </div>
                                <Tooltip
                                    title="Share your journey and inspire others"
                                    placement="top"
                                    classes={{ tooltip: 'bg-white p-2 rounded-md shadow-lg' }}
                                >
                                    <div className="fixed bottom-0 left-0 p-4">
                                        <Link to={'/blogeditor'}>
                                            <div className="bg-white rounded-full shadow-lg p-2">
                                                <Plus className="h-8 w-8 text-blue-500 hover:text-blue-700" />
                                            </div>
                                        </Link>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    )
            }
        </>
    );
}

export default SuccessStories