// import googlelogo from '../assets/logogoogle.png';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Trusted from '@/components/landing/Trusted';
import Banner from '@/components/landing/Banner';
import Faq from '@/components/landing/Faq';
import Footer from '@/components/landing/Footer';
import { Outlet } from 'react-router-dom';
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Trusted />
      <Banner />
      <Faq />
      <Footer />
      <Outlet />
    </>
  );
};

export default Home;
