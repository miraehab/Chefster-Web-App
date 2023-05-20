// DAO = Data Access Object
// provides an abstract interface to some type of database
// provides data operations without exposing database details
import {Ingredient} from "../../types"

export interface IngredientDao{
    createIngredient(ingredients : Ingredient) : Promise<void>;
    getIngredient(ingredientName : string) : Promise<Ingredient | undefined>;
}