import { CuisinePredictionRequest, CuisinePredictionResponse } from "../../api";
import { ExpressHandler } from "../../types";
import { PythonShell } from 'python-shell';

export const cuisinePredictionHandler : ExpressHandler<CuisinePredictionRequest, CuisinePredictionResponse> = async (req, res) => {
  if(!req.body.ingredients){
    return res.status(400).send({error: "The Ingredients are required"});
  }
  // get the input data for the prediction
  const ingredients = (req.body.ingredients).flatMap((word) => word.split(' '));
  PythonShell.run('predict.py', {scriptPath:'./handlers/cuisinePrediction',pythonPath:"C:\/Users\/mirae\/anaconda3/python", args: [JSON.stringify(ingredients)]}).then(message => {
    if(!message){
      return res.status(400).send({error: "Could not predict the cuisine."})
    }
    // handle error
    console.log("Cuisine:", message[0]) 
    console.log("With certainty: ", message[1], "%")
    return res.status(200).send({cuisine : message[0], certaintyLevel: message[1]});
  })
}