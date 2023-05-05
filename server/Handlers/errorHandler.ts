import { ErrorRequestHandler } from "express";

export const errorHandler : ErrorRequestHandler = (err, req, res) => {
    console.log("Uncaught Exception: ", err);
    return res.status(500).send("An unexpected error ocuured, Please Try Again.");
}