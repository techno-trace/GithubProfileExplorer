import React from 'react';
import useAppStore from '@/store';
import { Outlet, useParams } from 'react-router-dom';
import Header from '../Partials/Header';
import Footer from '../Partials/Footer';
import Hero from './Hero';

const Home = () => {
  const darkMode = useAppStore((state) => state.darkMode);
  const { username } = useParams<{ username: string }>();

  return (
    <main data-testid='ghapp-main' className={`bg-gray-50 dark:bg-slate-900 ${darkMode && 'dark'}`}>
      <div className='min-h-screen flex flex-col'>
        <Header />
        {username ? <Outlet /> : <Hero />}
        <Footer />
      </div>
    </main>
  );
};

export default Home;
