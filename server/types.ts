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
    ingredients: [];
    cuisine: string;
    userId: string;
    postedAt: number
}

export interface Like{
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

// to ensure the types of the request and response
export type ExpressHandler<Req, Res> = RequestHandler<
string,
Partial<Res>,
Partial<Req>,
any
>