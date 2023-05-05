import { Recipe } from "./types";

// Recipes API
export interface ListAllRecipesRequest {}
export interface ListAllRecipesResponse {
    recipes: Recipe[];
}

export type CreateRecipeRequest = Pick<Recipe, 'title' | 'instructions' | 'ingredients' | 'cuisine' | 'userId'>;
export interface CreateRecipeResponse {}

export interface GetRecipeRequest {}
export interface GetRecipeResponse {
    recipe: Recipe;
}

