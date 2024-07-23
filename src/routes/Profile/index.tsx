import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
  MapPinIcon,
  PuzzlePieceIcon,
  Square3Stack3DIcon,
  StarIcon,
  UsersIcon,
} from '@heroicons/react/20/solid';
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';
import useAppStore from '@/store';
import { classNames } from '@/common/classNames';
import Loader from '../Partials/Loader';
import Crumbs, { Page } from '../Partials/Crumbs';

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const isLoading = useAppStore((state) => state.isLoading);

  if (!username) {
    return isLoading ? <Loader /> : <></>;
  }

  const fetchUserProfile = useAppStore((state) => state.fetchUserProfile);
  const fetchUserFollowers = useAppStore((state) => state.fetchUserFollowers);
  const fetchUserRepos = useAppStore((state) => state.fetchUserRepositories);
  const fetchUserOrganizations = useAppStore((state) => state.fetchUserOrganizations);

  useEffect(() => {
    fetchUserProfile(username);
    fetchUserFollowers(username);
    fetchUserRepos(username);
    fetchUserOrganizations(username);
  }, [username]);

  const user = useAppStore((state) => state.userProfile);
  const repositories = useAppStore((state) => state.repositories);
  const followers = useAppStore((state) => state.followers);
  const organizations = useAppStore((state) => state.organizations);

  const pages: Page[] = [];
  pages.push({ name: 'Profile', href: `/profile/${username}`, current: false });
  pages.push({ name: username, href: `/profile/${username}`, current: true });

  if (!(user && repositories && followers && organizations)) {
    return isLoading ? <Loader /> : <></>;
  }

  return (
    <>
      <Crumbs pages={pages} />
      <div className='bg-white dark:bg-slate-900'>
        <div className='mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16'>
            <div className='lg:col-span-3 lg:row-end-1'>
              <div className='aspect-w-3 aspect-h-3 overflow-hidden rounded-lg'>
                <img
                  data-testid='ghapp-profile-avatar'
                  src={user.avatar_url}
                  alt='avatar'
                  className='object-cover object-center shadow-lg'
                />
              </div>
            </div>

            <div className='mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-4 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none'>
              <div className='flex flex-col-reverse'>
                <div className='mt-4'>
                  <h1
                    data-testid='ghapp-profile-name'
                    className='text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl'
                  >
                    {user.name}{' '}
                    <a className='text-sky-600' href={`https://github.com/${user.login}`}>
                      @{user.login}
                    </a>
                  </h1>

                  <h2 id='information-heading' className='sr-only'>
                    User Business Email
                  </h2>
                  <div className='mt-2 text-base flex flex-col'>
                    {user.email && (
                      <a
                        data-testid='ghapp-profile-email'
                        className='text-sky-600'
                        href={`mailto:${user.email}`}
                      >
                        {user.email}
                      </a>
                    )}
                    <a
                      data-testid='ghapp-profile-blog'
                      className='text-sky-600'
                      href={`${user.blog}`}
                    >
                      {user.blog}
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className='sr-only'>Reviews</h3>
                  <div className='flex items-center dark:text-gray-100'>
                    Popularity:
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          user.followers > rating * 5 ? 'text-yellow-400' : 'text-gray-300',
                          rating === 0 ? 'ml-2' : '',
                          'h-5 w-5 flex-shrink-0',
                        )}
                        aria-hidden='true'
                      />
                    ))}
                  </div>
                  <p className='sr-only'>{user.followers} Followers</p>
                </div>
              </div>

              <p data-testid='ghapp-profile-bio' className='mt-6 text-gray-500 dark:text-gray-300'>
                {user.bio}
              </p>

              <div className='mt-2 pt-2'>
                <div className='prose prose-sm mt-4 text-gray-500 dark:text-gray-300'>
                  <ul role='list' className='list-none'>
                    {user.company && (
                      <li className='flex items-center justify-start'>
                        <UsersIcon className='h-5 w-5 flex-shrink-0 mr-1 text-slate-900 dark:text-gray-100' />{' '}
                        {user.company}
                      </li>
                    )}
                    {user.location && (
                      <li className='flex items-center justify-start'>
                        <MapPinIcon className='h-5 w-5 flex-shrink-0 mr-1 text-slate-900 dark:text-gray-100' />{' '}
                        {user.location}
                      </li>
                    )}
                    {user.twitter_username && (
                      <li className='flex items-center justify-start'>
                        <svg
                          className='h-5 w-5 flex-shrink-0 mr-1 text-slate-900 dark:text-gray-100'
                          aria-hidden='true'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84' />
                        </svg>
                        {user.twitter_username}
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className='bg-white dark:bg-slate-900'>
                <h2 className='sr-only'>Details</h2>
                <div className='mx-auto max-w-7xl divide-y divide-gray-200 lg:flex lg:justify-center lg:divide-y-0 lg:divide-x lg:py-8'>
                  <div className='py-8 lg:w-1/3 lg:flex-none lg:py-0'>
                    <div className='mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8'>
                      <HeartIcon
                        className='h-8 w-8 flex-shrink-0 text-rose-600'
                        aria-hidden='true'
                      />
                      <div className='ml-4 flex flex-auto flex-col-reverse'>
                        <h3 className='font-medium text-gray-900 dark:text-gray-100'>Followers</h3>
                        <p className='text-sm text-gray-500 dark:text-gray-300'>{user.followers}</p>
                      </div>
                    </div>
                  </div>
                  <div className='py-8 lg:w-1/3 lg:flex-none lg:py-0'>
                    <div className='mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8'>
                      <ChatBubbleLeftRightIcon
                        className='h-8 w-8 flex-shrink-0 text-indigo-600'
                        aria-hidden='true'
                      />
                      <div className='ml-4 flex flex-auto flex-col-reverse'>
                        <h3 className='font-medium text-gray-900 dark:text-gray-100'>Following</h3>
                        <p className='text-sm text-gray-500 dark:text-gray-300'>{user.following}</p>
                      </div>
                    </div>
                  </div>
                  <div className='py-8 lg:w-1/3 lg:flex-none lg:py-0'>
                    <div className='mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8'>
                      <Square3Stack3DIcon
                        className='h-8 w-8 flex-shrink-0 text-emerald-600'
                        aria-hidden='true'
                      />
                      <div className='ml-4 flex flex-auto flex-col-reverse'>
                        <h3 className='font-medium text-gray-900 dark:text-gray-100'>Repos</h3>
                        <p className='text-sm text-gray-500 dark:text-gray-300'>
                          {user.public_repos}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='mx-auto mt-16 w-full max-w-3xl lg:col-span-6 lg:mt-0 lg:max-w-none'>
              <TabGroup as='div'>
                <div className='border-transparent'>
                  <TabList className='-mb-px flex space-x-8'>
                    <Tab
                      data-testid='ghapp-tab-repositories'
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-500 hover:border-gray-300 dark:hover:border-gray-500',
                          'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
                        )
                      }
                    >
                      Repositories
                    </Tab>
                    <Tab
                      data-testid='ghapp-tab-followers'
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-500 hover:border-gray-300 dark:hover:border-gray-500',
                          'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
                        )
                      }
                    >
                      Followers
                    </Tab>
                    <Tab
                      data-testid='ghapp-tab-organizations'
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-500 hover:border-gray-300 dark:hover:border-gray-500',
                          'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
                        )
                      }
                    >
                      Organizations
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as={Fragment}>
                  <TabPanel data-testid='ghapp-panel-repositories' className='-mb-10'>
                    <h3 className='sr-only'>Repositories</h3>

                    {repositories.map((repo) => (
                      <div data-testid='ghapp-repo-card' key={repo.id} className='flex flex-col'>
                        <div className='flex space-x-4 text-sm text-gray-500'>
                          <div className='flex-none py-10'>
                            <a href={repo.html_url}>
                              <PuzzlePieceIcon className='h-10 w-10 flex-shrink-0 text-emerald-400' />
                            </a>
                          </div>
                          <div className={classNames('py-10')}>
                            <a href={repo.html_url}>
                              <h3 className='font-medium text-gray-900 dark:text-gray-100'>
                                {repo.name}{' '}
                                <span className='text-rose-500'>
                                  {repo.language ? `(${repo.language})` : ''}
                                </span>
                              </h3>
                            </a>
                            <p className='dark:text-gray-500'>
                              {moment(repo.updated_at).format('LLL')}
                            </p>

                            <div className='mt-4 flex items-center'>
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    repo.watchers_count > rating * 5
                                      ? 'text-yellow-400'
                                      : 'text-gray-300',
                                    'h-5 w-5 flex-shrink-0',
                                  )}
                                  aria-hidden='true'
                                />
                              ))}
                            </div>
                            <p className='sr-only'>{repo.watchers_count} Watchers</p>

                            <div className='prose prose-sm mt-4 max-w-none text-gray-500 dark:text-gray-300'>
                              {repo.description || 'No description provided.'}
                            </div>
                          </div>
                        </div>

                        <div>
                          <dl className='mt-5 grid grid-cols-1 divide-y divide-gray-200 dark:divide-slate-900 overflow-hidden rounded-lg bg-white dark:bg-slate-800/75 shadow-lg md:grid-cols-3 md:divide-y-0 md:divide-x'>
                            <div className='px-4 py-5 sm:p-6'>
                              <dt className='text-base font-normal text-gray-900 dark:text-gray-300'>
                                Forks
                              </dt>
                              <dd className='mt-1 flex items-baseline justify-between md:block lg:flex'>
                                <div className='flex items-baseline text-2xl font-semibold text-indigo-600'>
                                  {repo.forks_count}
                                </div>
                              </dd>
                            </div>
                            <div className='px-4 py-5 sm:p-6'>
                              <dt className='text-base font-normal text-gray-900 dark:text-gray-300 flex items-center'>
                                Watchers
                              </dt>
                              <dd className='mt-1 flex items-baseline justify-between md:block lg:flex'>
                                <div className='flex items-baseline text-2xl font-semibold text-indigo-600'>
                                  {repo.watchers_count}
                                </div>
                              </dd>
                            </div>
                            <div className='px-4 py-5 sm:p-6'>
                              <dt className='text-base font-normal text-gray-900 dark:text-gray-300'>
                                Issues
                              </dt>
                              <dd className='mt-1 flex items-baseline justify-between md:block lg:flex'>
                                <div className='flex items-baseline text-2xl font-semibold text-indigo-600'>
                                  {repo.open_issues_count}
                                </div>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    ))}
                  </TabPanel>

                  <TabPanel data-testid='ghapp-panel-followers' className='text-sm text-gray-500'>
                    <h3 className='sr-only'>Followers</h3>

                    {followers.map((user) => (
                      <div
                        data-testid='ghapp-follower-card'
                        key={user.id}
                        className='flex space-x-4 text-sm text-gray-500 dark:text-gray-300'
                      >
                        <div className='flex-none py-10'>
                          <Link to={`/profiles/${user.login}`}>
                            <img
                              src={user.avatar_url}
                              alt='avatar'
                              className='h-20 w-20 rounded-md shadow-lg'
                            />
                          </Link>
                        </div>
                        <div className={classNames('py-10')}>
                          <Link className='text-sky-700' to={`/profiles/${user.login}`}>
                            <h3 className='font-medium text-xl text-gray-900 dark:text-gray-300'>
                              {user.login}
                            </h3>
                          </Link>
                          <p>
                            <a
                              className='text-sky-700 dark:text-sky-500'
                              href={`http://${user.repos_url}`}
                            >
                              Public Repos
                            </a>
                          </p>
                        </div>
                      </div>
                    ))}
                  </TabPanel>

                  <TabPanel
                    data-testid='ghapp-panel-organizations'
                    className='text-sm text-gray-500 dark:text-gray-300'
                  >
                    <h3 className='sr-only'>Organizations</h3>

                    {organizations.map((organization) => (
                      <div
                        data-testid='ghapp-org-card'
                        key={organization.id}
                        className='flex space-x-4'
                      >
                        <div className='flex-none py-10'>
                          <a href={`http://github.com/${organization.login}`}>
                            <img
                              src={organization.avatar_url}
                              alt='avatar'
                              className='h-20 w-20 rounded-md shadow-lg'
                            />
                          </a>
                        </div>
                        <div className={classNames('py-10')}>
                          <a
                            className='text-sky-700 dark:text-sky-500'
                            href={`http://github.com/${organization.login}`}
                          >
                            <h3 className='font-medium text-xl text-gray-900 dark:text-gray-100'>
                              {organization.login}
                            </h3>
                          </a>
                          <p>
                            <a
                              className='text-sky-700 dark:text-sky-500'
                              href={`http://${organization.repos_url}`}
                            >
                              Public Repos
                            </a>
                          </p>
                          <p className='dark:text-gray-300'>{organization.description}</p>
                        </div>
                      </div>
                    ))}
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
