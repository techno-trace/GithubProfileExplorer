import React from 'react';
import { PER_PAGE_RESULTS } from '@/common/constants';
import useAppStore from '@/store';
import { Link } from 'react-router-dom';

const Pagination = () => {
  const searchResultsCount = useAppStore((state) => state.totalCount);
  const currentPage = useAppStore((state) => state.currentPage);
  const totalResults = useAppStore((state) => state.totalCount);
  const searchTerm = useAppStore((state) => state.searchTerm);
  const perPageResults = PER_PAGE_RESULTS;
  const lastPage = Math.ceil(totalResults / perPageResults);

  return (
    <nav
      className='flex items-center justify-between border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 sm:px-6'
      aria-label='Pagination'
    >
      <div className='hidden sm:block'>
        <p className='text-base text-gray-700 dark:text-gray-300'>
          Showing <span className='font-semibold'>1</span> to{' '}
          <span className='font-semibold'>{perPageResults}</span> of{' '}
          <span className='font-semibold'>{searchResultsCount}</span> results
        </p>
      </div>
      <div className='flex flex-1 justify-between sm:justify-end'>
        <Link
          to={`/search/${searchTerm}${currentPage > 1 ? '?page=' + (currentPage - 1) : ''}`}
          className='relative inline-flex items-center rounded-md shadow border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50'
        >
          Previous
        </Link>
        <Link
          to={`/search/${searchTerm}?page=${currentPage < lastPage ? currentPage + 1 : lastPage}`}
          className='relative ml-3 inline-flex items-center rounded-md shadow border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50'
        >
          Next
        </Link>
      </div>
    </nav>
  );
};

export default Pagination;
