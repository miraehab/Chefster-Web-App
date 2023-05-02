import { RequestHandler } from "express"
import {db} from "../datastore/index"
import { Recipe } from "../types"
import crypto from 'crypto'
import { ExpressHandler } from "../types"

// It means that the request and response are empty.
export const getRecipesController : ExpressHandler<{}, {}> = (req, res) => {
    res.send({recipes: db.listAllRecipes()})
}

// The request type is a recipe
type CreateRecipeRequest = Pick<Recipe, 'title' | 'instructions' | 'ingredients' | 'cuisine' | 'userId'>;

export const createRecipe : ExpressHandler<CreateRecipeRequest, {}> = (req, res) => {
    if(!req.body.title || !req.body.instructions || !req.body.cuisine || !req.body.userId || !req.body.ingredients){
        console.log(req.body.cuisine)
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
        }
        db.createRecipe(recipe);
        return res.sendStatus(200);
    }
}