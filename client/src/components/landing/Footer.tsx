import { Heart, Youtube, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const navigation = ['Features', 'FAQ'];
  const legal = ['Privacy', 'Terms'];
  return (
    <div className='relative bg-gray-100 dark:bg-gray-800'>
      <>
        <div className='grid max-w-screen-xl grid-cols-1 gap-8 pt-10 ml-4 lg:mx-auto lg:grid-cols-5'>
          <div className='lg:col-span-2 lg:ml-6'>
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

            <div className='max-w-sm mt-2 text-pretty text-gray-800 dark:text-gray-400'>
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
                  className='w-full px-4 py-2 text-gray-800 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700'
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
                  className='w-full px-4 py-2 text-gray-800 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700'
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className='text-gray-800 dark:text-gray-300'>
            <div>Follow us</div>
            <div className='flex mt-5 space-x-5 text-gray-400 dark:text-gray-500'>
              <a
                href='https://twitter.com/web3templates'
                target='_blank'
                rel='noopener'
              >
                <Twitter className='hover:text-blue-500' />
              </a>

              <a
                href='https://instagram.com/web3templates'
                target='_blank'
                rel='noopener'
              >
                <Youtube className='hover:text-red-500' size={28} />
              </a>
              <a href='https://linkedin.com/' target='_blank' rel='noopener'>
                <span className='sr-only'>Linkedin</span>
                <Linkedin className='hover:text-blue-500' />
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
