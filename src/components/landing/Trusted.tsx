import { Bot, Github, HeartHandshake } from 'lucide-react';

const Trusted = () => {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6'>
        <div className='col-span-2 mb-8'>
          <p className='text-lg font-medium text-purple-600 dark:text-purple-500'>
            Open source
          </p>
          <h2 className='mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white'>
            Trust our task app, the leading choice for organizing your tasks
          </h2>
          <p className='font-light text-gray-500 sm:text-xl dark:text-gray-400'>
            Our rigorous security and compliance standards are at the heart of
            all we do. We work tirelessly to protect you and your customers.
          </p>
          <div className='pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700'></div>
        </div>
        <div className='col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0'>
          <div>
            <Github className='w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500' />
            <h3 className='mb-2 text-2xl font-bold dark:text-white'>
              100% open source
            </h3>
            <p className='font-light text-gray-500 dark:text-gray-400'>
              Open-source project for everyone.
            </p>
          </div>
          <div>
            <svg
              className='w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z'></path>
            </svg>
            <h3 className='mb-2 text-2xl font-bold dark:text-white'>
              For our users
            </h3>
            <p className='font-light text-gray-500 dark:text-gray-400'>
              Our project made for beloved users.
            </p>
          </div>
          <div>
            <HeartHandshake className='w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500' />
            <h3 className='mb-2 text-2xl font-bold dark:text-white'>
              Collaboration
            </h3>
            <p className='font-light text-gray-500 dark:text-gray-400'>
              collaborate by improving the app code
            </p>
          </div>
          <div>
            <Bot className='w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500' />
            <h3 className='mb-2 text-2xl font-bold dark:text-white'>
              Artificial intelligence
            </h3>
            <p className='font-light text-gray-500 dark:text-gray-400'>
              Work faster with AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
