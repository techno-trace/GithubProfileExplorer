import React from 'react';
import useAppStore from '@/store';
import Crumbs, { Page } from '../Partials/Crumbs';

const SearchResultsCount: React.FC = () => {
  const searchResultsCount = useAppStore((state) => state.totalCount);
  const pages: Page[] = [];
  const searchTerm = useAppStore((state) => state.searchTerm);

  pages.push({ name: 'Search', href: `/search/${searchTerm}`, current: false });
  pages.push({ name: searchTerm, href: `/search/${searchTerm}`, current: true });

  return (
    <>
      <Crumbs pages={pages} />
      <div className='relative bg-indigo-600 dark:bg-indigo-900'>
        <div className='mx-auto max-w-xl py-3 px-3 sm:px-6 lg:px-8'>
          <div className='pr-16 sm:px-16 sm:text-center'>
            <p className='font-medium text-white'>
              <span className='hidden md:inline'>
                You've found <strong>{searchResultsCount}</strong> results
              </span>
              <span className='block sm:ml-2 sm:inline-block'></span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultsCount;
