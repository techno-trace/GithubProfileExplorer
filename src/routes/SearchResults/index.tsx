import React, { useEffect } from 'react';
import Header from '../Partials/Header';
import Footer from '../Partials/Footer';
import useAppStore from '@/store';
import UsersListing from './UsersListing';
import { useParams, useSearchParams } from 'react-router-dom';
import Loader from '../Partials/Loader';

const SearchResults = () => {
  const { byusername } = useParams<{ byusername: string }>();
  const [searchParams, _] = useSearchParams();
  const darkMode = useAppStore((state) => state.darkMode);
  const findUser = useAppStore((state) => state.findUser);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const currentPage = useAppStore((state) => state.currentPage);
  const isLoading = useAppStore((state) => state.isLoading);

  useEffect(() => {
    let page = 1;
    try {
      page = Number(searchParams.get('page'));
    } catch (error) {}

    if (page > 0 && page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  useEffect(() => {
    if (byusername) {
      findUser(byusername);
    }
  }, [byusername, currentPage]);

  return (
    <main className={`bg-gray-50 dark:bg-slate-900 ${darkMode && 'dark'}`}>
      <div className='min-h-screen flex flex-col'>
        <Header />
        {isLoading ? <Loader /> : <UsersListing />}
        <Footer />
      </div>
    </main>
  );
};

export default SearchResults;
