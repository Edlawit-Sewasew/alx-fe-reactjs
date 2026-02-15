import { useRecipeStore } from './recipeStore'

/**
 * Toggle button to add or remove a recipe from favorites
 */
const FavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore(state => state.favorites)
  const addFavorite = useRecipeStore(state => state.addFavorite)
  const removeFavorite = useRecipeStore(state => state.removeFavorite)

  const isFavorite = favorites.includes(recipeId)

  const handleClick = () => {
    if (isFavorite) {
      removeFavorite(recipeId)
    } else {
      addFavorite(recipeId)
    }
  }

  return (
    <button type="button" onClick={handleClick}>
      {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
    </button>
  )
}

export default FavoriteButton
