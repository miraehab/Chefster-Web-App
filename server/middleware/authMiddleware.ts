import { verifyJwt } from "../auth";
import { ExpressHandler } from "../types";
import { db } from '../datastore'

export const authMiddleware : ExpressHandler<any, any> = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.sendStatus(401);
    }

    try{
        const payload = verifyJwt(token);
        const exist = await db.getUserById(payload.userId);
        if(!exist){
            // It will be caught in the catch below
            throw 'Not Found';
        }

        // To call the next middleware
        next();
    }catch{
        res.status(401).send({error: 'Bad Token!'});
    }
}