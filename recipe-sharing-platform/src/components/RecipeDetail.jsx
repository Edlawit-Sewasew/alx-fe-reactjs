import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import recipeData from '../data.json'
import { useRecipeStore } from './recipeStore'

const RecipeDetail = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const storeRecipes = useRecipeStore(state => state.recipes)

  useEffect(() => {
    const numericId = Number(id)
    const fromData = recipeData.find(r => r.id === numericId)
    const fromStore = storeRecipes.find(r => r.id === numericId)
    setRecipe(fromData ?? fromStore ?? undefined)
  }, [id, storeRecipes])

  if (recipe === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Recipe not found.
          </p>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            ← Back to recipes
          </Link>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-600 dark:text-gray-300">Loading recipe…</p>
      </div>
    )
  }

  const ingredients = recipe.ingredients ?? []
  const instructions = recipe.instructions ?? []

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium mb-6 text-sm md:text-base"
      >
        ← Back to recipes
      </Link>

      <article className="space-y-6 md:space-y-8">
        {/* Hero image & title */}
        <header className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800">
          <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              src={recipe.image || 'https://via.placeholder.com/400x250'}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
              {recipe.title}
            </h1>
            {(recipe.summary ?? recipe.description) && (
              <p className="mt-2 text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {recipe.summary ?? recipe.description}
              </p>
            )}
          </div>
        </header>

        {/* Ingredients card */}
        <section className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800 overflow-hidden">
          <div className="px-4 py-3 md:px-6 md:py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Ingredients
            </h2>
          </div>
          <ul className="p-4 md:p-6 space-y-2">
            {ingredients.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed"
              >
                <span className="text-blue-500 dark:text-blue-400 mt-1.5 shrink-0">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Instructions card */}
        <section className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800 overflow-hidden">
          <div className="px-4 py-3 md:px-6 md:py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Cooking instructions
            </h2>
          </div>
          <ol className="p-4 md:p-6 space-y-4">
            {instructions.map((step, index) => (
              <li
                key={index}
                className="flex gap-3 md:gap-4 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed"
              >
                <span className="flex shrink-0 items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold text-sm">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </article>
    </div>
  )
}

export default RecipeDetail
