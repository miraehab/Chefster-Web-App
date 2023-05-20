// DAO = Data Access Object
// provides an abstract interface to some type of database
// provides data operations without exposing database details
import {RecipeIngredient} from "../../types"

export interface RecipeIngredientDao{
    createRecipeIngredient(recipeIngredient : RecipeIngredient) : Promise<void>;
}