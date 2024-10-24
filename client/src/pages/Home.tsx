import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import { Outlet } from 'react-router-dom';
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Outlet />
    </>
  );
};

export default Home;
