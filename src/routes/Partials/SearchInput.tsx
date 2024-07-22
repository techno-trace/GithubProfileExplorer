import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import useAppStore from '@/store';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchInput: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const isLoading = useAppStore((state) => state.isLoading);

  const searchByUsername = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      const searchValue = e.currentTarget.value.trim();
      setSearch('');
      navigate(`/search/${searchValue}`);
    }
  };

  const searchOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) {
      return;
    }
    setSearch(e.currentTarget.value);
  };

  const searchInputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcut({
    keyCombination: ['Control', 'k'],
    action: () => {
      searchInputRef.current?.focus();
    },
  });

  return (
    <>
      <label
        htmlFor='search'
        className='block text-sm font-medium text-gray-700 dark:text-gray-300'
      >
        Search for users e.g. johnsmith
      </label>
      <div className='relative mt-1 flex items-center'>
        <input
          type='text'
          name='search'
          id='search'
          value={search}
          onChange={searchOnChangeHandler}
          onKeyDown={searchByUsername}
          disabled={isLoading}
          ref={searchInputRef}
          placeholder='Now Type Your Username'
          className={`block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${isLoading && 'disabled:opacity-75 cursor-not-allowed'}`}
        />
        <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
          <kbd className='inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400'>
            ⌘K
          </kbd>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
