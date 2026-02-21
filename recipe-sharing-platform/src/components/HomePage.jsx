import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'
import recipeData from '../data.json'

const HomePage = () => {
  const recipes = useRecipeStore(state => state.recipes)
  const setStoreRecipes = useRecipeStore(state => state.setRecipes)

  useEffect(() => {
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center sm:text-left text-gray-800 dark:text-gray-100">
          Recipe Sharing App
        </h1>
        <Link
          to="/add-recipe"
          className="shrink-0 inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition shadow-sm"
        >
          Add recipe
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map(recipe => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-blue-400"
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img
                src={recipe.image || 'https://via.placeholder.com/400x250'}
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {recipe.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {recipe.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage
