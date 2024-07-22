import { HomeIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { Link } from 'react-router-dom';

export interface Page {
  name: string;
  href: string;
  current: boolean;
}

interface CrumbsProps {
  pages: Page[];
}

const Crumbs: React.FC<CrumbsProps> = ({ pages }) => {
  return (
    <nav
      className='flex border-b border-gray-200 bg-white dark:bg-sky-900 dark:border-gray-100'
      aria-label='Breadcrumb'
    >
      <ol
        role='list'
        className='mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8'
      >
        <li className='flex'>
          <div className='flex items-center'>
            <Link
              to='/'
              className='text-gray-400 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-300'
            >
              <HomeIcon className='h-5 w-5 flex-shrink-0' aria-hidden='true' />
              <span className='sr-only'>Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name} className='flex'>
            <div className='flex items-center'>
              <svg
                className='h-full w-6 flex-shrink-0 text-gray-200'
                viewBox='0 0 24 44'
                preserveAspectRatio='none'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
              >
                <path d='M.293 0l22 22-22 22h1.414l22-22-22-22H.293z' />
              </svg>
              <a
                href={page.href}
                className='ml-4 text-base font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300'
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Crumbs;
