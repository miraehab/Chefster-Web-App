import { Ingredient, Recipe, User, Comment, Group } from "./types";

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

export interface GetUserParam {
    id: string;
}
export interface GetUserRequest {}
export interface GetUserResponse {
    user: Pick<User, 'firstName' | 'lastName' | 'username' | 'email' | 'id'>;
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

export interface DeleteCommentParam {
    recipeId : string,
    commentId: string
}
export interface DeleteCommentRequest {}
export interface DeleteCommentResponse {}

// Like API
export interface CreateLikeParam {
    recipeId : string;
}
export interface CreateLikeRequest {}
export interface CreateLikeResponse {}

// Group API
export type CreateGroupRequest = Pick<Group, 'groupName' | 'isPrivate' | 'groupPass'>;
export interface CreateGroupResponse {}

export interface ListAllGroupsRequest {}
export interface ListAllGroupsResponse {
    groups : Group[];
}

export interface ListUserJoinedGroupsRequest {}
export interface ListUserJoinedGroupsResponse {
    userGroups : Group[];
}

export interface ListUserCreatedGroupsRequest {}
export interface ListUserCreatedGroupsResponse {
    createdGroups : Group[];
}

export interface DeleteGroupParam{
    id : string;
}
export interface DeleteGroupRequest {}
export interface DeleteGroupResponse {}

export interface GetGroupParam {
    id : string,
}
export interface GetGroupRequest {}
export interface GetGroupResponse {
    group : Group
}

export interface joinGroupParam {
    id : string,
}
export interface joinGroupRequest {
    groupPass : string;
}
export interface joinGroupResponse {}

export interface ListGroupMembersParam {
    id: string;
}
export interface ListGroupMembersRequest {}
export interface ListGroupMembersResponse {
    members : User[];
}

//Cuisine Prediction
export interface CuisinePredictionRequest {
    ingredients: string[];
}
export interface CuisinePredictionResponse {
    cuisine: string;
    certaintyLevel: string;
}