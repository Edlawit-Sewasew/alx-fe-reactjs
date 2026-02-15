import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import RecipeDetails from './components/RecipeDetails'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
    </Routes>
  )
}

export default App
