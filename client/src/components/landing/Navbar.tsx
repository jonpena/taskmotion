import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Github, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '@/context/theme-provider';
import { Switch } from '@/components/ui/switch';

const Navbar = () => {
  const [starCount, setStarCount] = useState(0);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await axios.get(import.meta.env.VITE_GITHUB_API_URL);
      setStarCount(res.data.watchers);
    })();
  }, []);

  return (
    <header className='fixed w-full z-50'>
      <nav className='bg-white border-gray-200 py-2.5 dark:bg-black/0'>
        <div className='flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto'>
          <a href='' className='flex items-center'>
            <img src='favicon-128x128.png' className='w-8 mr-2' alt='Logo' />
            <span
              translate='no'
              className='self-center text-xl font-semibold whitespace-nowrap dark:text-white text-neutral-600'
            >
              Taskmotion
            </span>
          </a>
          <div className='flex items-center lg:order-2 gap-x-3'>
            <div className='flex items-center space-x-2'>
              <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={() =>
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                }
              />
              <Moon className='h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            </div>
            <a
              className='text-gray-300 flex items-center'
              href='https://github.com/jonpena/taskmotion'
              target='_blank'
            >
              <div
                className='h-9 pl-3 flex items-center rounded bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 cursor-pointer
            '
              >
                <Github className='w-4 h-4 mr-2 text-gray-800 dark:text-gray-200 ' />
                <div className='hidden mr-2 sm:inline-block text-gray-800 dark:text-white'>
                  Star
                </div>
                <span className='h-9 font-medium text-sm bg-gray-500 text-white dark:text-gray-800 dark:bg-gray-500 rounded-r border-gray-700 px-3 flex items-center '>
                  {starCount}
                </span>
              </div>
            </a>
            <Button
              variant='secondary'
              onClick={() => navigate('/login')}
              className='dark:text-white dark:bg-neutral-700'
            >
              Login
            </Button>
          </div>
          <div
            className='items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1'
            id='mobile-menu-2'
          ></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
