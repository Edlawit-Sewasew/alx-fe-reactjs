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
    // Favorites: array of recipe IDs the user has marked as favorites
    favorites: [],
    addFavorite: (recipeId) => set(state => {
      if (state.favorites.includes(recipeId)) return state
      return { favorites: [...state.favorites, recipeId] }
    }),
    removeFavorite: (recipeId) => set(state => ({
      favorites: state.favorites.filter(id => id !== recipeId)
    })),
    // Recommendations: personalized suggestions based on user's favorites
    recommendations: [],
    generateRecommendations: () => set(state => {
      // Recommend recipes NOT in favorites (discovery) - limit to 5 for variety
      const notFavorited = state.recipes.filter(
        recipe => !state.favorites.includes(recipe.id)
      )
      const recommended = notFavorited
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
      return { recommendations: recommended }
    }),
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
      const favorites = state.favorites.filter(favId => favId !== id)
      return {
        recipes,
        favorites,
        ...updateFiltered(recipes, state.searchTerm)
      }
    })
  }
})

export { useRecipeStore }
