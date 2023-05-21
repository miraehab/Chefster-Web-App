import express, {RequestHandler} from "express";
import {db, initDb} from "./datastore/index"
import {listAllRecipesHandler, createRecipeHandler, getRecipeHandler, deleteRecipeHandler} from "./handlers/recipeHandler"
import {errorHandler} from './middleware/errorHandler'
import asyncHandler from "express-async-handler"
import { signUpHandler, signInHandler } from "./handlers/userHandler";
import { createCommentHandler, listAllCommentsHandler, deleteCommentHandler } from "./handlers/commentHandler";
import dotenv from 'dotenv'
import { authMiddleware } from "./middleware/authMiddelware";
import { RequestLoggerMiddleware } from './middleware/requestLoggerMiddelware'
import { createLikeHandler } from "./handlers/likeHandler";
import path from "path"

(async ()=>{

    // To ensure that the database initiated correctly
    // Because without databse our app couldn't run
    //await initDb(path.join(__dirname, "datastore", "sql", "chefsterdb.sqlite"));
    dotenv.config();
    await initDb(":memory:");

    const app = express();

    app.use(express.json());

    app.use(RequestLoggerMiddleware);

    // Public Endpoints
    app.post('/v1/signup', asyncHandler(signUpHandler));
    app.post('/v1/signin', asyncHandler(signInHandler));

    // Any action after sign up needs athentication
    app.use(authMiddleware);

    // Protected Endpoints
    app.get('/v1/recipes', asyncHandler(listAllRecipesHandler));
    app.post('/v1/recipes', asyncHandler(createRecipeHandler));
    app.get('/v1/recipes/:id', asyncHandler(getRecipeHandler));
    app.delete('/v1/recipes/:id', asyncHandler(deleteRecipeHandler));

    app.post('/v1/recipes/:recipeId/comments', asyncHandler(createCommentHandler))
    app.get('/v1/recipes/:recipeId/comments', asyncHandler(listAllCommentsHandler))
    app.delete('/v1/recipes/:recipeId/comments/:commentId', asyncHandler(deleteCommentHandler))

    app.post('/v1/recipes/:recipeId/Likes', asyncHandler(createLikeHandler))

    app.use(errorHandler);

    app.listen(3000, ()=>{
        console.log("App is listening on port 3000!");
    });

})();