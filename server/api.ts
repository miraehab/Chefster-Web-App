import { Ingredient, Recipe, User } from "./types";

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

//Users API
export type SignUpRequest = Pick<User, 'firstName' | 'lastName' | 'username' | 'password' | 'email'>;
export interface SignUpResponse {}

export interface SignInRequest {
    login: string; //username or e-mail
    password: string;
}
export type SinInResponse = Pick<User, 'firstName' | 'lastName' | 'username' | 'email' | 'id'>;