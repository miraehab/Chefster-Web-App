// DAO = Data Access Object
// provides an abstract interface to some type of database
// provides data operations without exposing database details
import {Recipe} from "../types"

export interface RecipeDao{
    listAllRecipes() : Recipe[];
    createRecipe(recipe : Recipe) : void;
    getRecipe(id : string) : Recipe | undefined;
    deleteRecipe(id : string) : void;
}