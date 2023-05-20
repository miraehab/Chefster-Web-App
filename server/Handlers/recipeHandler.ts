import { RequestHandler } from "express"
import {db} from "../datastore/index"
import { Recipe, Ingredient, RecipeIngredient } from "../types"
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
    if(!req.body.title || !req.body.instructions || !req.body.cuisine || !req.body.userId){
        return res.sendStatus(400);
    }else{
        const recipe : Recipe = {
            id: crypto.randomUUID(),
            postedAt: Date.now(),
            title: req.body.title,
            instructions: req.body.instructions,
            cuisine: req.body.cuisine,
            userId: req.body.userId
        };
        await db.createRecipe(recipe);

        let ingredients = req.body.ingredients != undefined? req.body.ingredients.filter(val => val!=undefined):[];
        let ingredientsLen = req.body.ingredients == undefined? 0 : ingredients.length;
        for(let i = 0; i < ingredientsLen; i++){
            const ingredient : Ingredient = {
                id: crypto.randomUUID(),
                ingredientName: ingredients[i]
            };

            await db.createIngredient(ingredient);

            const recipeIngredient : RecipeIngredient = {
                recipeId: recipe.id,
                ingrdientId: ingredient.id
            }

            await db.createRecipeIngredient(recipeIngredient);
        }

        return res.sendStatus(200);
    }
}