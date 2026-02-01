import { create } from 'zustand'

const filterBySearchTerm = (recipes, searchTerm) => {
  const term = searchTerm.toLowerCase().trim()
  if (!term) return recipes
  return recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(term) ||
    (recipe.description && recipe.description.toLowerCase().includes(term))
  )
}

const useRecipeStore = create(set => {
  const updateFiltered = (recipes, searchTerm) => ({
    filteredRecipes: filterBySearchTerm(recipes, searchTerm)
  })

  return {
    recipes: [],
    searchTerm: '',
    filteredRecipes: [],
    setSearchTerm: (term) => set(state => ({
      searchTerm: term,
      ...updateFiltered(state.recipes, term)
    })),
    filterRecipes: () => set(state =>
      updateFiltered(state.recipes, state.searchTerm)
    ),
    addRecipe: (newRecipe) => set(state => {
      const recipes = [...state.recipes, newRecipe]
      return {
        recipes,
        ...updateFiltered(recipes, state.searchTerm)
      }
    }),
    setRecipes: (recipes) => set(state => ({
      recipes,
      ...updateFiltered(recipes, state.searchTerm)
    })),
    updateRecipe: (id, updatedRecipe) => set(state => {
      const recipes = state.recipes.map(recipe =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      )
      return {
        recipes,
        ...updateFiltered(recipes, state.searchTerm)
      }
    }),
    deleteRecipe: (id) => set(state => {
      const recipes = state.recipes.filter(recipe => recipe.id !== id)
      return {
        recipes,
        ...updateFiltered(recipes, state.searchTerm)
      }
    })
  }
})

export { useRecipeStore }
