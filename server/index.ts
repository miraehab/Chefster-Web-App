import express, {RequestHandler} from "express";
import {db} from "./datastore/index"

const app = express();

app.use(express.json());

// Will be executed always when a request occurs.
const RequestLoggerMiddleware : RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, '-body:', req.body);
    next();
};

app.use(RequestLoggerMiddleware);

app.get('/recipes', (req, res) => {
    res.send({recipes: db.listAllRecipes()})
})

app.post('/recipes', (req, res) => {
    const recipe = req.body;
    db.createRecipe(recipe);
    res.sendStatus(200);
})

app.listen(3000, ()=>{
    console.log("App is listening on port 3000!")
});