import React from 'react';
import HeroSection from '../components/HeroSection';
import TrendingJobs from '../components/TrendingJobs';
import HowItWorks from '../components/HowItWorks';
import TopCompanies from '../components/TopCompanies';
import Newsletter from '../components/Newsletter';


function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <TrendingJobs />
        <HowItWorks />
        <TopCompanies /> 
         <Newsletter /> 
      </main>
    </>
  );
}

export default Home;