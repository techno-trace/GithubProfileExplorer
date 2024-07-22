import useAppStore from '@/store';
import React from 'react';

const Footer = () => {
  const apiRequestsMade = useAppStore((state) => state.apiRequestsMade);
  const searchesMade = useAppStore((state) => state.searchesMade);

  return (
    <footer className='bg-gray-100 dark:bg-slate-900 shadow-inner p-4 flex justify-between items-center dark:border-t dark:border-indigo-800'>
      <a
        href='https://github.com'
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-600 hover:underline'
      >
        <button
          type='button'
          className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Go To Repo
        </button>
      </a>
      <div className='bg-gray-200 rounded-md p-2 shadow-sm'>
        <p className='text-sm'>API Requests: {apiRequestsMade}</p>
        <p className='text-sm'>Searches Made: {searchesMade}</p>
      </div>
    </footer>
  );
};

export default Footer;
