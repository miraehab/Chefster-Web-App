import { RequestHandler } from "express";

export interface User{
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string
}

export interface Recipe{
    id: string;
    title: string;
    instructions: string;
    cuisine: string;
    userId: string;
    postedAt: number
}

export interface Ingredient{
    id: string;
    ingredientName: string
}

export interface RecipeIngredient{
    recipeId: string;
    ingredientId: string
}

export interface Like{
    id : string;
    userId: string;
    recipeId: string
}

export interface Comment{
    id: string;
    userId: string;
    recipeId: string;
    comment: string;
    postedAt: number
}

export interface Group{
    id: string;
    groupName: string;
    groupCreatorId: string;
    isPrivate: boolean;
}

export interface JoinGroup{
    userId: string;
    groupId: string;
}

type WithError<T> = T & {error: string};

// to ensure the types of the request and response
export type ExpressHandler<Req, Res> = RequestHandler<
string,
Partial<WithError<Res>>,
Partial<Req>,
any
>

export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;

export interface JwtObject{
    userId: string;
}