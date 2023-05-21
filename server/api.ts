import { Ingredient, Recipe, User, Comment } from "./types";

// Recipes API
export interface ListAllRecipesRequest {}
export interface ListAllRecipesResponse {
    recipes: Recipe[];
}

export type CreateRecipeRequest = Pick<Recipe, 'title' | 'instructions' | 'cuisine'> & {ingredients: string[]};
export interface CreateRecipeResponse {}

export interface GetRecipeParam {
    id : string;
}
export interface GetRecipeRequest {}
export interface GetRecipeResponse {
    recipe: Recipe;
}

export interface DeleteRecipeParam {
    id : string;
}
export interface DeleteRecipeRequest {}
export interface DeleteRecipeResponse {}

    
//Users API
export type SignUpRequest = Pick<User, 'firstName' | 'lastName' | 'username' | 'password' | 'email'>;
export interface SignUpResponse {
    jwt : string;
}

export interface SignInRequest {
    login: string; //username or e-mail
    password: string;
}
export type SignInResponse = {
    user: Pick<User, 'firstName' | 'lastName' | 'username' | 'email' | 'id'>;
    jwt: string;
}

// Comment API
export interface CreateCommentParam {
    recipeId : string;
}
export type CreateCommentRequest = Pick<Comment, 'comment'>;
export interface CreateCommentResponse {}

export interface ListAllCommentsParam {
    recipeId : string;
}
export interface ListAllCommentsRequest {}
export interface ListAllCommentsResponse {
    comments : Comment[];
}