import { Routes, Route } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import SearchBar from './components/SearchBar'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import './App.css'

function App() {
  return (
    <>
      <h1>Recipe Sharing App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddRecipeForm />
              <SearchBar />
              <RecipeList />
            </>
          }
        />
        <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </>
  )
}

export default App
