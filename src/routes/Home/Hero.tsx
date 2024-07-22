import React from 'react';
import Logo from '../Partials/Logo';

const Hero = () => {
  return (
    <div className='relative bg-white dark:bg-slate-800'>
      <div className='mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8'>
        <div className='px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-24 lg:pb-28 xl:col-span-6'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <Logo />
            <div className='hidden sm:mt-16 sm:flex lg:mt-8'>
              <div className='relative rounded-full py-1 px-3 text-sm leading-6 text-gray-500 dark:text-gray-100 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-300/10 dark:hover:ring-gray-300/20 shadow-xl'>
                Search for users by the username, you just guess & the app will do the rest.{' '}
                <a
                  href='https://github.com'
                  className='whitespace-nowrap font-semibold text-indigo-600'
                >
                  <span className='absolute inset-0' aria-hidden='true' />
                  View Repo <span aria-hidden='true'>&rarr;</span>
                </a>
              </div>
            </div>
            <h1 className='mt-24 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:mt-10 sm:text-6xl'>
              Welcome to Github Profile Explorer App
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300'>
              Press CTRL/Command + K for easy search
            </p>
          </div>
        </div>
        <div className='relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0'>
          <img
            className='aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full'
            src='/src/assets/hero.avif'
            alt=''
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
