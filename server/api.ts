import { Ingredient, Recipe } from "./types";

// Recipes API
export interface ListAllRecipesRequest {}
export interface ListAllRecipesResponse {
    recipes: Recipe[];
}

export type CreateRecipeRequest = Pick<Recipe, 'title' | 'instructions' | 'cuisine' | 'userId'> & {ingredients: string[]};
export interface CreateRecipeResponse {}

export interface GetRecipeRequest {}
export interface GetRecipeResponse {
    recipe: Recipe;
}

