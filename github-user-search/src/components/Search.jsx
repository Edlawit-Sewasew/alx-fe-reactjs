import { useState } from 'react'

function Search() {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Search logic will be implemented in next steps
    console.log('Search:', query)
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
        />
        <button type="submit">Search</button>
      </form>
    </section>
  )
}

export default Search
