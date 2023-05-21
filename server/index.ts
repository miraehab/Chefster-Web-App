import express, {RequestHandler} from "express";
import {db, initDb} from "./datastore/index"
import {listAllRecipesHandler, createRecipeHandler, getRecipeHandler, deleteRecipeHandler} from "./handlers/recipeHandler"
import {errorHandler} from './middleware/errorHandler'
import asyncHandler from "express-async-handler"
import { signUpHandler, signInHandler } from "./handlers/UserHandler";
import { createComment } from "./handlers/commentHandler";
import dotenv from 'dotenv'
import { authMiddleware } from "./middleware/authMiddelware";
import { RequestLoggerMiddleware } from './middleware/requestLoggerMiddelware'

(async ()=>{

    // To ensure that the database initiated correctly
    // Because without databse our app couldn't run
    await initDb();
    dotenv.config();

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

    app.post('/v1/recipes/:recipeId/comment', asyncHandler(createComment))

    app.use(errorHandler);

    app.listen(3000, ()=>{
        console.log("App is listening on port 3000!");
    });

})();