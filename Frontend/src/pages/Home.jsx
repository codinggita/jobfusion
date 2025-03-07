import React from 'react';
import HeroSection from '../components/HeroSection';
import TrendingJobs from '../components/TrendingJobs';
import HowItWorks from '../components/HowItWorks';
import TopCompanies from '../components/TopCompanies';
import Newsletter from '../components/Newsletter';
import Review from '../components/Reviews';

function Home() {
  window.scrollTo(0, 0);
  return (
    <>
      <main>
        <HeroSection />
        <TrendingJobs />
        <HowItWorks />
        <TopCompanies /> 
        <Review />  
         <Newsletter /> 
      </main>
    </>
  );
}

export default Home;