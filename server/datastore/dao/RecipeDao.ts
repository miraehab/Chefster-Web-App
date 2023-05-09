// DAO = Data Access Object
// provides an abstract interface to some type of database
// provides data operations without exposing database details
import {Recipe} from "../../types"

export interface RecipeDao{
    listAllRecipes() : Promise<Recipe[]>;
    createRecipe(recipe : Recipe) : Promise<void>;
    getRecipeById(id : string) : Promise<Recipe | undefined>;
    deleteRecipe(id : string) : Promise<void>;
}