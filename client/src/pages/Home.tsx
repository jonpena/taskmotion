import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import Footer from '@/components/home/Footer';
import { Outlet } from 'react-router-dom';
const Home = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-1'>
        <Navbar />
        <Hero />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
