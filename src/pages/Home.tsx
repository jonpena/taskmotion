// import googlelogo from '../assets/logogoogle.png';
import Navbar from '@/components/landing/Navbar';
import { AuthContextProvider, UserAuth } from '../context/AuthContext';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Trusted from '@/components/landing/Trusted';
import Banner from '@/components/landing/Banner';
// import Cite from '@/components/landing/Cite';
// import Pricing from '@/components/landing/Pricing';
import Faq from '@/components/landing/Faq';
import Footer from '@/components/landing/Footer';
const Home = () => {
  const { signout } = UserAuth();

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Trusted />
      {/* <Cite /> */}
      {/* <Pricing /> */}
      <Banner />
      <Faq />
      <Footer />
    </>
  );
};

export default Home;
