import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x250'

const parseLines = (text) =>
  text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe)
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const ingredientsList = parseLines(ingredients)
  const stepsList = parseLines(steps)

  const validate = () => {
    const next = {}
    if (!title.trim()) next.title = 'Recipe title is required.'
    if (ingredientsList.length < 2) next.ingredients = 'Please enter at least two ingredients (one per line).'
    if (stepsList.length < 1) next.steps = 'Please enter at least one preparation step (one per line).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleBlur = (field) => () => setTouched((t) => ({ ...t, [field]: true }))

  const handleSubmit = (event) => {
    event.preventDefault()
    setTouched({ title: true, ingredients: true, steps: true })
    if (!validate()) return

    addRecipe({
      id: Date.now(),
      title: title.trim(),
      description: stepsList[0] ? `${stepsList[0].slice(0, 80)}${stepsList[0].length > 80 ? '…' : ''}` : 'User-added recipe',
      image: PLACEHOLDER_IMAGE,
      ingredients: ingredientsList,
      instructions: stepsList
    })
    setTitle('')
    setIngredients('')
    setSteps('')
    setErrors({})
    setTouched({})
  }

  const showError = (field) => touched[field] && errors[field]

  return (
    <div className="min-h-screen w-full max-w-2xl mx-auto p-4 md:p-6">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium mb-4 text-sm md:text-base"
      >
        ← Back to recipes
      </Link>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800 overflow-hidden">
        <header className="px-4 py-3 md:px-6 md:py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
            Add new recipe
          </h2>
        </header>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="recipe-title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Recipe title
            </label>
            <input
              id="recipe-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleBlur('title')}
              placeholder="e.g. Spaghetti Carbonara"
              className={`w-full px-3 py-2 md:px-4 md:py-2.5 rounded-lg border text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 outline-none transition ${
                showError('title')
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              aria-invalid={!!showError('title')}
              aria-describedby={showError('title') ? 'title-error' : undefined}
            />
            {showError('title') && (
              <p id="title-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <label
              htmlFor="recipe-ingredients"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Ingredients <span className="text-gray-500 dark:text-gray-400">(one per line, at least 2)</span>
            </label>
            <textarea
              id="recipe-ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              onBlur={handleBlur('ingredients')}
              placeholder="e.g.&#10;400g spaghetti&#10;200g pancetta"
              rows={5}
              className={`w-full px-3 py-2 md:px-4 md:py-2.5 rounded-lg border text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 outline-none transition resize-y min-h-[100px] ${
                showError('ingredients')
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              aria-invalid={!!showError('ingredients')}
              aria-describedby={showError('ingredients') ? 'ingredients-error' : undefined}
            />
            {showError('ingredients') && (
              <p id="ingredients-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.ingredients}
              </p>
            )}
          </div>

          {/* Preparation steps */}
          <div>
            <label
              htmlFor="recipe-steps"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Preparation steps <span className="text-gray-500 dark:text-gray-400">(one per line)</span>
            </label>
            <textarea
              id="recipe-steps"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              onBlur={handleBlur('steps')}
              placeholder="e.g.&#10;Bring a large pot of salted water to the boil.&#10;Add the pasta and cook until al dente."
              rows={6}
              className={`w-full px-3 py-2 md:px-4 md:py-2.5 rounded-lg border text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 outline-none transition resize-y min-h-[120px] ${
                showError('steps')
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              aria-invalid={!!showError('steps')}
              aria-describedby={showError('steps') ? 'steps-error' : undefined}
            />
            {showError('steps') && (
              <p id="steps-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.steps}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full md:w-auto px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition shadow-sm"
            >
              Add recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddRecipeForm
