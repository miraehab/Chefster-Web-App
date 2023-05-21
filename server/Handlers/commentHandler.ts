import { CreateCommentParam, CreateCommentRequest, CreateCommentResponse } from "../api";
import { ExpressHandlerWithParams, Comment } from "../types";
import { getUserId } from "../utils/getUserId";
import crypto from 'crypto'
import { db } from '../datastore'

export const createComment : ExpressHandlerWithParams<CreateCommentParam, CreateCommentRequest, CreateCommentResponse> = async (req, res) => {
    if(!req.body.comment || req.body.comment.trim() === ""){
        return res.status(401).send({error : "You should write a comment."})
    }

    const recipeId = req.params.recipeId;
    if(!recipeId){
        return res.status(400).send({error: "You Should comment on a recipe!"});
    }
    const recipeExist = await db.getRecipeById(recipeId);
    if(!recipeExist){
        return res.status(404).send({error: "You Should comment on an existed recipe!"});
    }
    const userId = getUserId(req.headers.authorization);

    const comment : Comment = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        userId,
        recipeId,
        comment: req.body.comment
    }

    await db.createComment(comment);

    return res.sendStatus(200);
}