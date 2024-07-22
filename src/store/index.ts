import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { StoreState } from './contracts';
import { createAppStoreSlice } from './app.slice';

export const createPartializedState = (state: StoreState) => ({
  darkMode: state.darkMode,
  searchTerm: state.searchTerm,
  apiRequestsMade: state.apiRequestsMade,
  searchesMade: state.searchesMade,
  isLoading: state.isLoading,
  currentPage: state.currentPage,
  totalCount: state.totalCount,
  incompleteResults: state.incompleteResults,
  users: state.users,
  userProfile: state.userProfile,
  repositories: state.repositories,
  followers: state.followers,
  organizations: state.organizations,
  rate: state.rate,
});

const useAppStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        ...createAppStoreSlice(set, get),
      }),
      {
        name: 'appStore',
        partialize: (state) => createPartializedState(state),
      },
    ),
  ),
);

export default useAppStore;
