import React from 'react';
import useAppStore from '@/store';
import Users from './Users';
import SearchResultsCount from './SearchResultsCount';
import Pagination from './Pagination';

const UsersListing = () => {
  const areUsersAvailable = useAppStore((state) => state.getUsersCount)() > 0;

  return (
    <>
      {areUsersAvailable && <SearchResultsCount />}
      <Users />
      {areUsersAvailable && <Pagination />}
    </>
  );
};

export default UsersListing;
