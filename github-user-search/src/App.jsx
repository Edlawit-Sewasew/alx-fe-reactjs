import './App.css'
import Search from './components/Search'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <header className="w-full py-8 px-4 text-center">
        <h1 className="text-3xl font-bold m-0 mb-2">GitHub User Search</h1>
        <p className="text-slate-600 dark:text-slate-400 m-0">
          Search for GitHub profiles with advanced filters
        </p>
      </header>
      <main className="flex-1 w-full max-w-4xl px-4 pb-8">
        <Search />
      </main>
    </div>
  )
}

export default App
