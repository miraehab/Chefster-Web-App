import { RequestHandler } from "express";

// Will be executed always when a request occurs.
export const RequestLoggerMiddleware : RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, '-body:', req.body);
    next();
};