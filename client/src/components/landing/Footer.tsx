import { Heart } from 'lucide-react';

export default function Footer() {
  const navigation = ['Features', 'FAQ'];
  const legal = ['Privacy', 'Terms', 'Legality'];
  return (
    <div className='relative bg-gray-800'>
      <>
        <div className='grid max-w-screen-xl grid-cols-1 gap-8 pt-10 ml-4 lg:mx-auto lg:grid-cols-5'>
          <div className='lg:col-span-2'>
            <div>
              <a
                href='/'
                className='flex items-center text-2xl font-medium text-indigo-500 dark:text-gray-100'
              >
                <img
                  src='logo.png'
                  alt='N'
                  width='32'
                  height='32'
                  className='w-8 mr-2'
                />
                <span translate='no'>Taskmotion</span>
              </a>
            </div>

            <div className='max-w-sm mt-2 text-pretty text-gray-500 dark:text-gray-400'>
              Open-source task management app focusing on enhancing productivity
              and efficiency. It employs artificial intelligence tools and
              innovative strategies to boost productivity.
            </div>
          </div>

          <div>
            <div className='flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0'>
              {navigation.map((item, index) => (
                <a
                  key={index}
                  href={'#' + item.toLowerCase()}
                  className='w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700'
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className='flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0'>
              {legal.map((item, index) => (
                <a
                  key={index}
                  href='/'
                  className='w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700'
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className='dark:text-gray-300'>
            <div>Follow us</div>
            <div className='flex mt-5 space-x-5 text-gray-400 dark:text-gray-500'>
              <a
                href='https://twitter.com/web3templates'
                target='_blank'
                rel='noopener'
              >
                <span className='sr-only'>Twitter</span>
                <Twitter />
              </a>

              <a
                href='https://instagram.com/web3templates'
                target='_blank'
                rel='noopener'
              >
                <span className='sr-only'>Instagram</span>
                <Instagram />
              </a>
              <a href='https://linkedin.com/' target='_blank' rel='noopener'>
                <span className='sr-only'>Linkedin</span>
                <Linkedin />
              </a>
            </div>
          </div>
        </div>

        <div className='text-sm py-8 text-center text-gray-600 dark:text-gray-400'>
          Made with
          <Heart
            className='text-red-600 mx-2 inline-block'
            size={14}
            strokeWidth={3}
          />
          by
          <a
            className='mx-1'
            href='https://web3templates.com/'
            target='_blank'
            rel='noopener'
          >
            community
          </a>
          {new Date().getFullYear()}
        </div>
      </>
    </div>
  );
}

const Twitter = ({ size = 24 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
  >
    <path d='M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z' />
  </svg>
);

const Instagram = ({ size = 24 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
  >
    <path d='M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z' />
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
  >
    <path d='M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z' />
  </svg>
);
