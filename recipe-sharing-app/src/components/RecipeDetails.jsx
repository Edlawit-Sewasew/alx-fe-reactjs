import { Link, useParams } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'
import EditRecipeForm from './EditRecipeForm'
import DeleteRecipeButton from './DeleteRecipeButton'

const RecipeDetails = ({ recipeId: recipeIdProp }) => {
  const { recipeId: recipeIdParam } = useParams()
  const recipeId = recipeIdProp ?? recipeIdParam
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === Number(recipeId))
  )

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">Back to recipes</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/">← Back to recipes</Link>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipeId} />
    </div>
  )
}

export default RecipeDetails
