import api from '@/common/api';
import { StoreSlice, AppStoreSlice, UserProfile } from './contracts';
import {
  PER_PAGE_FOLLOWERS_RESULTS,
  PER_PAGE_ORGS_RESULTS,
  PER_PAGE_REPOSITORIES_RESULTS,
  PER_PAGE_RESULTS,
} from '@/common/constants';

export const createAppStoreSlice: StoreSlice<AppStoreSlice> = (set, get) => ({
  searchTerm: '',
  darkMode: true,
  apiRequestsMade: 0,
  searchesMade: 0,
  isLoading: false,
  currentPage: 1,
  totalCount: 0,
  incompleteResults: null,
  users: [],
  userProfile: null,
  repositories: [],
  followers: [],
  organizations: [],
  rate: {
    limit: null,
    used: null,
    remaining: null,
    reset: null,
  },
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  fetchRateLimits: async () => {
    const response = await api.get('/rate_limit');

    if (response.data?.rate) {
      set({ rate: response.data.rate });
    }
  },
  getUsersCount: () => get().users.length,
  setLoading: (isLoading: boolean) => set({ isLoading }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  incrementAPIRequestsMade: () =>
    set((state: AppStoreSlice) => ({ apiRequestsMade: state.apiRequestsMade + 1 })),
  incrementSearchesMade: () =>
    set((state: AppStoreSlice) => ({
      searchesMade: state.searchesMade + 1,
    })),
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  isRateLimitExceeded: () => get().rate.remaining === 0,

  findUser: async (username: string) => {
    await get().fetchRateLimits();

    if (get().isRateLimitExceeded()) {
      return;
    }

    set({ isLoading: true, searchTerm: username });

    const response = await api.get(
      `/search/users?per_page=${PER_PAGE_RESULTS}&page=${get().currentPage}&q=${username}`,
    );

    if (response.data?.items?.length) {
      get().incrementAPIRequestsMade();
      get().incrementSearchesMade();
      get().setSearchTerm(username);

      const usersData: UserProfile[] = response.data.items;

      set({
        totalCount: response.data?.total_count,
        incompleteResults: response.data?.incomplete_results,
      });

      const usersWithAllDetails: UserProfile[] = await Promise.all(
        usersData.map(async (userData) => {
          const response = await api.get(`/users/${userData.login}`);
          if (response.data) {
            get().incrementAPIRequestsMade();
            return response.data;
          }
          return userData;
        }),
      );

      if (usersWithAllDetails.length) {
        set({ users: usersWithAllDetails });
      }
      set({ isLoading: false });
    }
  },

  fetchUserProfile: async (username: string) => {
    await get().fetchRateLimits();
    if (get().isRateLimitExceeded()) {
      return;
    }
    set({ isLoading: true });

    let userProfile = get().users.find((user) => user.login === username);

    if (!userProfile) {
      const response = await api.get(`/users/${username}`);

      if (response.data) {
        get().incrementAPIRequestsMade();
        userProfile = response.data;
      }
    }

    set({ userProfile: userProfile });

    set({ isLoading: false });
  },

  fetchUserRepositories: async (username: string) => {
    await get().fetchRateLimits();
    if (get().isRateLimitExceeded()) {
      return;
    }
    set({ isLoading: true });
    const response = await api.get(
      `/users/${username}/repos?per_page=${PER_PAGE_REPOSITORIES_RESULTS}&sort=pushed`,
    );
    set({ repositories: response.data });
    get().incrementAPIRequestsMade();
    set({ isLoading: false });
  },

  fetchUserFollowers: async (username: string) => {
    await get().fetchRateLimits();
    if (get().isRateLimitExceeded()) {
      return;
    }
    set({ isLoading: true });
    const response = await api.get(
      `/users/${username}/followers?per_page=${PER_PAGE_FOLLOWERS_RESULTS}`,
    );
    set({ followers: response.data });
    get().incrementAPIRequestsMade();
    set({ isLoading: false });
  },

  fetchUserOrganizations: async (username: string) => {
    await get().fetchRateLimits();
    if (get().isRateLimitExceeded()) {
      return;
    }
    set({ isLoading: true });
    const response = await api.get(`/users/${username}/orgs?per_page=${PER_PAGE_ORGS_RESULTS}`);
    set({ organizations: response.data });
    get().incrementAPIRequestsMade();
    set({ isLoading: false });
  },
});
