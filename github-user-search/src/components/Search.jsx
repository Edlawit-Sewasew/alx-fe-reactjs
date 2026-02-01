import { useState } from 'react'
import { fetchUserData, searchUsersAdvanced } from '../services/githubService'

const PER_PAGE = 10

function Search() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [minRepos, setMinRepos] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [hasSearched, setHasSearched] = useState(false)

  const hasMore = users.length < totalCount && totalCount > 0

  async function fetchFullUsers(logins) {
    const results = await Promise.allSettled(
      logins.map((login) => fetchUserData(login).then((r) => r.data))
    )
    return results.map((r) => (r.status === 'fulfilled' ? r.value : null)).filter(Boolean)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim() && !location.trim() && minRepos === '') return

    setLoading(true)
    setError(false)
    setUsers([])
    setPage(1)
    setHasSearched(true)

    try {
      const response = await searchUsersAdvanced({
        query: query.trim(),
        location: location.trim(),
        minRepos: minRepos === '' ? '' : minRepos,
        page: 1,
        perPage: PER_PAGE,
      })
      const { items, total_count } = response.data
      setTotalCount(total_count)
      if (items.length === 0) {
        setUsers([])
      } else {
        const logins = items.map((u) => u.login)
        const fullUsers = await fetchFullUsers(logins)
        setUsers(fullUsers)
      }
    } catch {
      setError(true)
      setTotalCount(0)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = async () => {
    const nextPage = page + 1
    setLoadingMore(true)
    setError(false)
    try {
      const response = await searchUsersAdvanced({
        query: query.trim(),
        location: location.trim(),
        minRepos: minRepos === '' ? '' : minRepos,
        page: nextPage,
        perPage: PER_PAGE,
      })
      const { items } = response.data
      if (items.length > 0) {
        const logins = items.map((u) => u.login)
        const fullUsers = await fetchFullUsers(logins)
        setUsers((prev) => [...prev, ...fullUsers])
      }
      setPage(nextPage)
    } catch {
      setError(true)
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-6" aria-label="GitHub user search">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Username or search term
            </span>
            <input
              type="text"
              placeholder="e.g. john or octocat"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-60"
              aria-label="Username or search term"
              disabled={loading}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Location
            </span>
            <input
              type="text"
              placeholder="e.g. Berlin"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-60"
              aria-label="Filter by location"
              disabled={loading}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Min. repositories
            </span>
            <input
              type="number"
              min="0"
              placeholder="e.g. 5"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              aria-label="Minimum number of repositories"
              disabled={loading}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && (
        <p className="mt-6 text-center text-indigo-600 dark:text-indigo-400" role="status">
          Loading...
        </p>
      )}

      {error && !loading && (
        <p className="mt-6 text-center text-red-600 dark:text-red-400" role="alert">
          Looks like we cant find the user
        </p>
      )}

      {hasSearched && !loading && !error && users.length === 0 && (
        <p className="mt-6 text-center text-slate-600 dark:text-slate-400">
          No users found. Try different criteria.
        </p>
      )}

      {users.length > 0 && !loading && (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {users.length} of {totalCount} result{totalCount !== 1 ? 's' : ''}
          </p>
          <ul className="space-y-3" role="list">
            {users.map((user) => (
              <li key={user.id}>
                <article className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <img
                    src={user.avatar_url}
                    alt={`${user.login} avatar`}
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
                      {user.name || user.login}
                    </h2>
                    {user.name && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">@{user.login}</p>
                    )}
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0 text-sm text-slate-600 dark:text-slate-300">
                      {user.location && (
                        <span title="Location">📍 {user.location}</span>
                      )}
                      <span title="Public repositories">
                        📦 {user.public_repos ?? 0} repos
                      </span>
                    </div>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none focus:underline"
                    >
                      View full profile →
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          {hasMore && (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-60 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                {loadingMore ? 'Loading...' : 'Load more'}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Search
