import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes)

  return (
    <div>
      {filteredRecipes.map(recipe => (
        <div key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default RecipeList
