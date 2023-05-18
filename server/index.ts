import express, {RequestHandler} from "express";
import {db, initDb} from "./datastore/index"
import {listAllRecipesHandler, createRecipeHandler} from "./handlers/recipeHandler"
import {errorHandler} from './handlers/errorHandler'
import asyncHandler from "express-async-handler"

(async ()=>{

    // To ensure that the database initiated correctly
    // Because without databse our app couldn't run
    await initDb();

    const app = express();

    app.use(express.json());

    // Will be executed always when a request occurs.
    const RequestLoggerMiddleware : RequestHandler = (req, res, next) => {
        console.log(req.method, req.path, '-body:', req.body);
        next();
    };

    app.use(RequestLoggerMiddleware);

    app.get('/v1/recipes', asyncHandler(listAllRecipesHandler));
    app.post('/v1/recipes', asyncHandler(createRecipeHandler));

    app.use(errorHandler);

    app.listen(3000, ()=>{
        console.log("App is listening on port 3000!");
    });

})();