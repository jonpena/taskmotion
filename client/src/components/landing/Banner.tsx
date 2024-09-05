import { useNavigate } from 'react-router-dom';
import { Button } from '../UI/button';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className='bg-gray-50 dark:bg-gray-800'>
      <div className='max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6'>
        <div className='max-w-screen-sm mx-auto text-center'>
          <h2 className='mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white'>
            Start using our open source task app
          </h2>
          <p className='mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg'>
            Create your tasks and manage them in the best way
          </p>
          <Button
            onClick={() => navigate('/login')}
            className='dark:text-white dark:bg-indigo-600'
          >
            Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
