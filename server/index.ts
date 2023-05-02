import express, {RequestHandler} from "express";
import {db} from "./datastore/index"
import {getRecipesController, createRecipe} from "./Handlers/recipeHandler"

const app = express();

app.use(express.json());

// Will be executed always when a request occurs.
const RequestLoggerMiddleware : RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, '-body:', req.body);
    next();
};

app.use(RequestLoggerMiddleware);

app.get('/recipes', getRecipesController)

app.post('/recipes', createRecipe)

app.listen(3000, ()=>{
    console.log("App is listening on port 3000!")
});