import { Github } from 'lucide-react';

const Hero = () => {
  return (
    <section id='home' className='bg-white dark:bg-black/0'>
      <div className='grid max-w-screen-xl px-2 sm:px-0 pt-44 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-52 lg:grid-cols-12 lg:pt-56'>
        <div className='md:ml-6 mr-auto place-self-center lg:col-span-7'>
          <h1 className='max-w-2xl mb-4 text-4xl font-extrabold  md:text-5xl dark:text-white'>
            Organize and improve your productivity & efficiency
          </h1>
          <p className='max-w-2xl mt-10 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
            Open-source task management app focusing on improving productivity
            and efficiency. Utilizing diferent tools and innovative strategies.
            innovative strategies.
          </p>
          <div className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4'>
            <a
              target='_blank'
              href='https://github.com/jonpena/taskmotion'
              className='inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
            >
              <Github className='w-4 h-4 mr-2 text-gray-800 dark:text-gray-200 ' />
              View in GitHub
            </a>
          </div>
        </div>
        <div className='hidden lg:mt-0 lg:col-span-5 lg:flex animation-fade-in'>
          <img src='illus-1.svg' alt='hero image' />
        </div>
      </div>
    </section>
  );
};

export default Hero;
