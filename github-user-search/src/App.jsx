import './App.css'
import Search from './components/Search'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Search for GitHub profiles</p>
      </header>
      <main className="app-main">
        <Search />
      </main>
    </div>
  )
}

export default App
