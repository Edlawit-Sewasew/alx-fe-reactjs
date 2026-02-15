import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

/**
 * Shows personalized recipe recommendations based on user's favorites.
 * Recommends recipes the user hasn't favorited yet for discovery.
 */
const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations)
  const favorites = useRecipeStore(state => state.favorites)
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations)

  // Regenerate recommendations when favorites change (user preferences updated)
  useEffect(() => {
    generateRecommendations()
  }, [generateRecommendations, favorites])

  return (
    <div>
      <h2>Recommended for You</h2>
      {recommendations.length === 0 ? (
        <p>Add recipes and favorites to get personalized recommendations!</p>
      ) : (
        recommendations.map(recipe => (
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

export default RecommendationsList
