import { CreateLikeParam, CreateLikeRequest, CreateLikeResponse } from "../api";
import { ExpressHandlerWithParams, Like } from "../types";
import { db } from '../datastore'
import { getUserId } from "../utils/getUserId";
import crypto from 'crypto'

export const createLikeHandler : ExpressHandlerWithParams<CreateLikeParam, CreateLikeRequest, CreateLikeResponse> = async (req, res) =>{
    const recipeId = req.params.recipeId;
    const userId = getUserId(req.headers.authorization);
    if(!recipeId){
        return res.status(400).send({error: "You Should Like on a Recipe."});
    }

    const recipe = await db.getRecipeById(recipeId);
    if(!recipe){
        return res.status(404).send({error: "You Should Like on an existed Recipe."});
    }

    // Toggle like
    let like = await db.getLike(recipeId, userId);
    if(!like){
        like = {
            id: crypto.randomUUID(),
            recipeId,
            userId
        }
    
        await db.createLike(like);
    }else{
        await db.deleteLike(like.id);
    }

    return res.sendStatus(200);
}