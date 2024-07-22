import React from 'react';
import SearchInput from './SearchInput';
import DarkModeToggle from './DarkModeToggle';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  return (
    <nav className='bg-gray-100 dark:bg-slate-900 shadow-md p-4 flex justify-between items-center dark:border-b dark:border-indigo-800'>
      <div className='flex items-center'>
        <Logo />
        <div className='ml-4'>
          <h1 className='text-xl font-semibold dark:text-gray-100'>
            <Link to='/'>Search Github Profiles</Link>
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-300'>
            Browse users and their profiles and orgs. via the GitHub API
          </p>
        </div>
      </div>

      <div className='flex items-center'>
        <DarkModeToggle />
        <div className='relative'>
          <SearchInput />
        </div>
      </div>
    </nav>
  );
};

export default Header;
