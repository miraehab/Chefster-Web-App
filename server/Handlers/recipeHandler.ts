import { RequestHandler } from "express"
import { db } from "../datastore/index"
import { Recipe, Ingredient, RecipeIngredient, ExpressHandlerWithParams } from "../types"
import crypto from 'crypto'
import { ExpressHandler } from "../types"
import {ListAllRecipesRequest, ListAllRecipesResponse, CreateRecipeRequest, CreateRecipeResponse, GetRecipeRequest, GetRecipeResponse, GetRecipeParam, DeleteRecipeParam, DeleteRecipeRequest, DeleteRecipeResponse} from '../api'
import { verifyJwt } from "../auth"
import { getUserId } from '../utils/getUserId'

// It means that the request and response are empty.
export const listAllRecipesHandler : ExpressHandler<ListAllRecipesRequest, ListAllRecipesResponse> = async (req, res) => {
    // we don't return the list directly as we want the API design to be flexible in case we wanted to add other infos
    // example: res.send({recipes: db.listAllRecipes(), number_lists: ... })
    return res.status(200).send({recipes: await db.listAllRecipes()});
}

export const createRecipeHandler : ExpressHandler<CreateRecipeRequest, CreateRecipeResponse> = async (req, res) => {
    if(!req.body.title || !req.body.instructions || !req.body.cuisine || !req.body.ingredients || req.body.title.trim() === ""){
        return res.status(400).send({error: "All Fields are required."});
    }else{
        const dataUriToBuffer = require('data-uri-to-buffer');

        const recipe : Recipe = {
            id: crypto.randomUUID(),
            postedAt: Date.now(),
            title: req.body.title,
            instructions: req.body.instructions,
            cuisine: req.body.cuisine,
            userId: getUserId(req.headers.authorization),
            image: new Uint8Array(dataUriToBuffer(req.body.image))
        };
        await db.createRecipe(recipe);

        for(let ingredient of req.body.ingredients){
            if(ingredient == undefined || ingredient.trim() === ""){
                return res.status(400).send({error: "All ingredients are required"});
            }
        }

        for(let ingredient of req.body.ingredients){
            ingredient = ingredient.trim().toLowerCase()
            let currentIngredient = await db.getIngredient(ingredient)

            if(!currentIngredient){
                currentIngredient = {
                    id: crypto.randomUUID(),
                    ingredientName: ingredient
                };
    
                await db.createIngredient(currentIngredient);
            }

            const recipeIngredient : RecipeIngredient = {
                recipeId: recipe.id,
                ingredientId: currentIngredient.id
            }

            await db.createRecipeIngredient(recipeIngredient);
        }

        // created
        return res.sendStatus(201);
    }
}

export const getRecipeHandler : ExpressHandlerWithParams<GetRecipeParam, GetRecipeRequest, GetRecipeResponse> = async (req, res) => {
    const id = req.params.id;

    if(!id){
        return res.sendStatus(404);
    }

    const recipe = await db.getRecipeById(id);

    if(!recipe){
        res.status(404).send({error: "Recipe Not Found"});
    }

    return res.status(200).send({
        recipe: recipe
    });
}

export const deleteRecipeHandler : ExpressHandlerWithParams<DeleteRecipeParam, DeleteRecipeRequest, DeleteRecipeResponse> = async (req, res) => {
    const id = req.params.id;
    const userId = getUserId(req.headers.authorization)

    if(!id){
        return res.sendStatus(404);
    }

    const recipe = await db.getRecipeById(id);
    if(!recipe){
        return res.status(404).send({error: "You should Delete an existed recipe"});
    }

    // To check that the user who wants to delete the recipe is the same who posted it
    if(recipe.userId !== userId){
        return res.status(400).send({error: "You should delete your own recipe!"});
    }

    await db.deleteRecipe(id);

    return res.sendStatus(200);
}