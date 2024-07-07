import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';
const Navbar = () => {
  const [starCount, setStarCount] = useState(0);
  const anchors = ['Home', 'Features', 'FAQ'];
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await axios.get(import.meta.env.VITE_GITHUB_API_URL);
      setStarCount(res.data.watchers);
    })();
  }, []);

  return (
    <header className='fixed w-full'>
      <nav className='bg-white border-gray-200 py-2.5 dark:bg-gray-900'>
        <div className='flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto'>
          <a href='#' className='flex items-center'>
            <img src='logo.png' className='w-7 mr-2' alt='Taskmotion Logo' />
            <span
              translate='no'
              className='self-center text-xl font-semibold whitespace-nowrap dark:text-white text-indigo-500'
            >
              Taskmotion
            </span>
          </a>
          <div className='flex items-center lg:order-2 gap-x-3'>
            <div
              className='h-9 pl-3 flex items-center rounded bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer
            '
            >
              <Github className='w-4 h-4 mr-2 text-gray-800 dark:text-gray-200 ' />
              <a
                className='text-gray-300 flex items-center'
                href='https://github.com/jonpena/taskmotion'
              >
                <div className='hidden mr-2 sm:inline-block text-gray-800 dark:text-white'>
                  Star
                </div>
                <span className='h-9 font-medium text-sm bg-gray-500 text-white dark:text-gray-800 dark:bg-gray-500 rounded-r border-gray-700 px-3 flex items-center '>
                  {starCount}
                </span>
              </a>
            </div>
            <button
              onClick={() => navigate('/login')}
              className='text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800'
            >
              Login
            </button>
          </div>
          <div
            className='items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1'
            id='mobile-menu-2'
          >
            <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
              {anchors.map((anchor) => (
                <li key={anchor}>
                  <a
                    href={`#${anchor}`.toLowerCase()}
                    className='block py-2 pl-3 pr-4 text-white bg-indigo-700 rounded lg:bg-transparent lg:text-indigo-700 lg:p-0 dark:text-white'
                    aria-current='page'
                  >
                    {anchor}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
