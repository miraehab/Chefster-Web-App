import { RequestHandler } from "express"
import {db} from "../datastore/index"
import { Recipe } from "../types"
import crypto from 'crypto'
import { ExpressHandler } from "../types"
import {ListAllRecipesRequest, ListAllRecipesResponse, CreateRecipeRequest, CreateRecipeResponse} from '../api'

// It means that the request and response are empty.
export const listAllRecipesHandler : ExpressHandler<ListAllRecipesRequest, ListAllRecipesResponse> = async (req, res) => {
    // we don't return the list directly as we want the API design to be flexible in case we wanted to add other infos
    // example: res.send({recipes: db.listAllRecipes(), number_lists: ... })
    return res.send({recipes: await db.listAllRecipes()});
}

export const createRecipeHandler : ExpressHandler<CreateRecipeRequest, CreateRecipeResponse> = async (req, res) => {
    if(!req.body.title || !req.body.instructions || !req.body.cuisine || !req.body.userId || !req.body.ingredients){
        return res.sendStatus(400);
    }else{
        const recipe : Recipe = {
            id: crypto.randomUUID(),
            postedAt: Date.now(),
            title: req.body.title,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients,
            cuisine: req.body.cuisine,
            userId: req.body.userId
        };
        await db.createRecipe(recipe);
        return res.sendStatus(200);
    }
}