import { CreateCommentParam, CreateCommentRequest, CreateCommentResponse, DeleteCommentParam, DeleteCommentRequest, DeleteCommentResponse, ListAllCommentsParam, ListAllCommentsRequest, ListAllCommentsResponse } from "../api";
import { ExpressHandlerWithParams, Comment, ExpressHandler } from "../types";
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

export const listAllComments : ExpressHandlerWithParams<ListAllCommentsParam, ListAllCommentsRequest, ListAllCommentsResponse> = async (req, res) => {
    const recipeId = req.params.recipeId;
    if(!recipeId){
        return res.status(400).send({error: "You Should get comments of a recipe!"});
    }
    const recipeExist = await db.getRecipeById(recipeId);
    if(!recipeExist){
        return res.status(404).send({error: "You Should get comments of an existed recipe!"});
    }

    const comments = await db.listAllComments(recipeId);

    return res.status(200).send({
        comments
    });
}

export const deleteCommentHandler : ExpressHandlerWithParams<DeleteCommentParam, DeleteCommentRequest, DeleteCommentResponse> = async (req, res) => {
    const recipeId = req.params.recipeId;
    const commentId = req.params.commentId;
    const userId = getUserId(req.headers.authorization)

    //Check Recipe
    if(!recipeId){
        return res.status(400).send({error: "You Should delete comment of a recipe!"});
    }
    const recipeExist = await db.getRecipeById(recipeId);
    if(!recipeExist){
        return res.status(404).send({error: "You Should delete comment of an existed recipe!"});
    }

    // Check Comment
    if(!commentId){
        return res.status(404).send({error: "You Should delete a specific comment"});
    }
    const curComment = await db.getCommentById(commentId);
    if(!curComment){
        return res.status(404).send({error: "You Should delete an existed comment."});
    }

    // Check if this Comment is in the same Recipe
    if(curComment.recipeId !== recipeId){
        return res.status(404).send({error: "This Comment doesn't exist in this recipe."});
    }

    // Check if the user who wants to delete the comment is the same who posted it.
    if(curComment.userId !== userId){
        return res.status(400).send({error: "You Should Delete your own Comment!"});
    }

    await db.deleteComment(commentId);

    return res.sendStatus(200);
}