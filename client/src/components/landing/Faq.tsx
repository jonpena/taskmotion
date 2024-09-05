import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Faq = () => {
  const [open, setopen] = useState('');

  const handleAccordion = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (open === e.currentTarget.getAttribute('id')) {
      setopen('');
    } else {
      setopen(e.currentTarget.getAttribute('id') || '');
    }
  };

  return (
    <section id='about' className='pt-16 bg-white dark:bg-gray-900'>
      <div className='max-w-screen-xl px-4 pb-8 mx-auto lg:pb-24 lg:px-6 '>
        <h2 className='mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white'>
          Frequently asked questions
        </h2>
        <div className='max-w-screen-md mx-auto'>
          <div
            id='accordion-flush'
            data-accordion='collapse'
            data-active-classes='bg-white dark:bg-gray-900 text-gray-900 dark:text-white'
            data-inactive-classes='text-gray-500 dark:text-gray-400'
          >
            <h3 id='accordion-1' onClick={handleAccordion}>
              <button
                type='button'
                className={`flex items-center justify-between w-full py-5 font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${
                  open === 'accordion-1'
                    ? 'dark:text-white'
                    : 'dark:text-gray-400'
                } `}
                data-accordion-target='#accordion-flush-body-1'
                aria-expanded='true'
                aria-controls='accordion-flush-body-1'
              >
                <span>
                  Is it an open-source project where anyone can collaborate?
                </span>
                <ChevronDown
                  className={`mr-1 ${open === 'accordion-1' && 'rotate-180'}`}
                  size={20}
                  strokeWidth={3}
                />
              </button>
            </h3>
            <div className={`${open === 'accordion-1' ? 'block' : 'hidden'}`}>
              <div className='py-5 hide border-b border-gray-200 dark:border-gray-700'>
                <p className='mb-2 text-gray-500 dark:text-gray-400'>
                  Yes, this project is open source and welcomes contributions
                  from anyone interested in getting involved.
                </p>
                <p className='mt-3 text-gray-500 dark:text-gray-400'>
                  We firmly believe in the philosophy of open source, which
                  promotes transparency, accessibility, and open collaboration.
                  We invite all developers, enthusiasts, and subject matter
                  experts to join us and contribute their expertise.
                </p>
                <p className='mt-3 text-gray-500 dark:text-gray-400'>
                  Together, we can make this project grow and thrive, benefiting
                  the entire community.
                </p>
              </div>
            </div>
            <h3 id='accordion-2' onClick={handleAccordion}>
              <button
                type='button'
                className={`flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 ${
                  open === 'accordion-2'
                    ? 'dark:text-white'
                    : 'dark:text-gray-400'
                }`}
                data-accordion-target='#accordion-flush-body-2'
                aria-expanded='false'
                aria-controls='accordion-flush-body-2'
              >
                <span>
                  What is the difference between this task app and the others
                  that exist?
                </span>
                <ChevronDown
                  className={`mr-1 ${open === 'accordion-2' && 'rotate-180'}`}
                  size={20}
                  strokeWidth={3}
                />
              </button>
            </h3>
            <div
              className={`${open === 'accordion-2' ? '' : 'hidden'}`}
              aria-labelledby='accordion-flush-heading-2'
            >
              <div className='py-5 border-b border-gray-200 dark:border-gray-700'>
                <p className='mb-2 dark:text-gray-400'>
                  We focus on creating an attractive, efficient and constantly
                  evolving application to meet the needs of today's world.
                </p>
                <p className='text-gray-500 dark:text-gray-400'>
                  Our priority is to offer an exceptional user experience, where
                  usability and design merge to provide an intuitive and
                  pleasant environment to manage your tasks.
                </p>
              </div>
            </div>
            <h3 id='accordion-3' onClick={handleAccordion}>
              <button
                type='button'
                className={`flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 ${
                  open === 'accordion-3'
                    ? 'dark:text-white'
                    : 'dark:text-gray-400'
                }`}
                aria-expanded='false'
                aria-controls='accordion-flush-body-3'
              >
                <span>
                  Can the community propose new features and functionalities to
                  the app?
                </span>
                <ChevronDown
                  className={`mr-1 ${open === 'accordion-3' && 'rotate-180'}`}
                  size={20}
                  strokeWidth={3}
                />
              </button>
            </h3>
            <div
              id='accordion-flush-body-3'
              className={`${open === 'accordion-3' ? '' : 'hidden'}`}
              aria-labelledby='accordion-flush-heading-3'
            >
              <div className='py-5 border-b border-gray-200 dark:border-gray-700'>
                <p className='mb-2 text-gray-500 dark:text-gray-400'>
                  es, in our development philosophy we value the active
                  participation of our user community.
                </p>
                <p className='mb-2 text-gray-500 dark:text-gray-400'>
                  We strongly believe in open collaboration and listening to
                  suggestions and comments from everyone interested in improving
                  our application.
                </p>
                <p className='mb-2 text-gray-500 dark:text-gray-400'>
                  Therefore, we welcome all ideas and proposals for features and
                  functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
