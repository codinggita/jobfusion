import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import TrendingJobs from '../components/TrendingJobs';
import HowItWorks from '../components/HowItWorks';
import TopCompanies from '../components/TopCompanies';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrendingJobs />
        <HowItWorks />
        <TopCompanies /> 
         <Newsletter /> 
      </main>
      <Footer />
    </>
  );
}

export default Home;