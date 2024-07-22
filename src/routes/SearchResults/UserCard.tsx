import { UserProfile } from '@/store/contracts';
import React from 'react';
import { Link } from 'react-router-dom';

const UserCard: React.FC<UserProfile> = ({
  avatar_url,
  login,
  name,
  location,
  blog,
  followers,
  following,
  public_repos,
}) => (
  <div className='flex flex-col justify-center'>
    <div className='relative flex flex-col md:flex-row md:space-x-2 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-gray-200 dark:border-slate-400 bg-white dark:bg-slate-900'>
      <div className='w-full md:w-1/3 grid place-items-center'>
        <Link to={`/profiles/${login}`}>
          <img src={avatar_url} alt='tailwind logo' className='rounded-md shadow' />
        </Link>
        <p className='text-gray-500 font-medium hidden md:block dark:text-gray-300'>
          <Link preventScrollReset={false} to={`/profiles/${login}`}>
            @{login}
          </Link>
        </p>
        <p className='font-medium text-sm text-amber-600 hidden md:block'>
          {following} (following)
        </p>
      </div>
      <div className='w-full md:w-2/3 flex flex-col space-y-2 p-3'>
        <div className='flex justify-between item-center'>
          <div className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-yellow-500'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
            <p className='text-gray-600 font-bold text-sm ml-1 dark:text-gray-300'>
              {public_repos}
              <span className='font-semibold dark:text-gray-400'> repos</span>
            </p>
          </div>
          <div className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-pink-500'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                clipRule='evenodd'
              />
            </svg>
            <div className='bg-gray-200 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-semibold text-gray-800 dark:text-gray-300 hidden md:block ml-1'>
              {followers} Followers
            </div>
          </div>
        </div>
        <h3 className='font-black text-gray-800 md:text-2xl text-xl dark:text-gray-100'>{name}</h3>
        <p className='md:text-lg text-gray-500 text-base dark:text-gray-400'>{location}</p>
        <p className='text-xl font-black text-gray-800'>
          <span className='font-normal text-sky-600 dark:text-sky-400 text-base'>
            <a href={`https://github.com/${login}`} target='_blank'>
              {blog}
            </a>
          </span>
        </p>
      </div>
    </div>
  </div>
);

export default UserCard;
