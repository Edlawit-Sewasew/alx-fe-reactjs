import { useState } from 'react'
import { fetchUserData } from '../services/githubService'

function Search() {
  const [query, setQuery] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = query.trim()
    if (!username) return

    setLoading(true)
    setError(false)
    setUser(null)

    try {
      const response = await fetchUserData(username)
      setUser(response.data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search GitHub users"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>

      {loading && <p className="search-message search-loading">Loading...</p>}

      {error && !loading && (
        <p className="search-message search-error">
          Looks like we cant find the user
        </p>
      )}

      {user && !loading && (
        <article className="user-card">
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            className="user-avatar"
          />
          <div className="user-info">
            <h2 className="user-name">{user.name || user.login}</h2>
            {user.name && <p className="user-login">@{user.login}</p>}
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="user-link"
            >
              View GitHub profile
            </a>
          </div>
        </article>
      )}
    </section>
  )
}

export default Search
