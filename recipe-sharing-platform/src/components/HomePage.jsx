import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'
import recipeData from '../data.json'

const HomePage = () => {
  const [recipes, setRecipes] = useState([])
  const setStoreRecipes = useRecipeStore(state => state.setRecipes)

  useEffect(() => {
    setRecipes(recipeData)
    setStoreRecipes(
      recipeData.map(({ id, title, summary, image }) => ({
        id,
        title,
        description: summary,
        image
      }))
    )
  }, [setStoreRecipes])

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
        Recipe Sharing App
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map(recipe => (
          <Link
            key={recipe.id}
            to={`/recipes/${recipe.id}`}
            className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-blue-400"
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {recipe.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {recipe.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage
