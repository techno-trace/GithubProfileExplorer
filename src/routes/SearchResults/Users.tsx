import React from 'react';
import UserCard from './UserCard';
import useAppStore from '@/store';

const Users = () => {
  const users = useAppStore((state) => state.users);

  return (
    <section className='flex-grow p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </section>
  );
};

export default Users;
