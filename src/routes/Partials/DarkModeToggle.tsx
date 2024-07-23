import React from 'react';
import { classNames } from '@/common/classNames';
import useAppStore from '@/store';
import { Switch } from '@headlessui/react';

const DarkModeToggle = () => {
  const darkModeEnabled = useAppStore((state) => state.darkMode);
  const setDarkMode = useAppStore((state) => state.toggleDarkMode);

  const toggleDarkMode = () => {
    setDarkMode();
  };

  return (
    <Switch
      checked={darkModeEnabled}
      onChange={toggleDarkMode}
      className={classNames(
        darkModeEnabled ? 'bg-slate-800' : 'bg-gray-200',
        'mr-6 mt-4 relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-md',
      )}
    >
      <span className='sr-only'>Toggle Dark Mode</span>
      <span
        className={classNames(
          darkModeEnabled ? 'translate-x-8' : 'translate-x-0',
          'pointer-events-none relative inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        )}
      >
        <span
          className={classNames(
            darkModeEnabled
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
          )}
          aria-hidden='true'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
            />
          </svg>
        </span>
        <span
          className={classNames(
            darkModeEnabled
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
          )}
          aria-hidden='true'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
            />
          </svg>
        </span>
      </span>
    </Switch>
  );
};

export default DarkModeToggle;
