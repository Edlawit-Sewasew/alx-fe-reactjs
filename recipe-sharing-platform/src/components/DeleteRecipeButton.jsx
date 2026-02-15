import { useNavigate } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  const navigate = useNavigate()

  const handleDelete = () => {
    deleteRecipe(Number(recipeId))
    navigate('/')
  }

  return (
    <button type="button" onClick={handleDelete}>
      Delete Recipe
    </button>
  )
}

export default DeleteRecipeButton
