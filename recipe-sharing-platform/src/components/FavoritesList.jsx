import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

/**
 * Displays the user's favorite recipes by mapping favorite IDs to full recipe objects
 */
const FavoritesList = () => {
  const favorites = useRecipeStore(state =>
    state.favorites
      .map(id => state.recipes.find(recipe => recipe.id === id))
      .filter(Boolean)
  )

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet. Add some from the recipe list!</p>
      ) : (
        favorites.map(recipe => (
          <div key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

export default FavoritesList
