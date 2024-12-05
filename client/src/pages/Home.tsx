import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import Footer from '@/components/home/Footer';
import { Outlet } from 'react-router-dom';
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
      <Outlet />
    </>
  );
};

export default Home;
