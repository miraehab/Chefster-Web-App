import { SignUpRequest, SignUpResponse } from "../api";
import { db } from '../datastore'
import { ExpressHandler, User } from "../types";
import crypto from 'crypto';

export const signUpHandler : ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    if(!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password || !req.body.username){
        return res.status(400).send("All Fields are required");
    }

    const alreadyExist = await db.getUserByEmail(req.body.email) || await db.getUserByUsername(req.body.username);
    if(alreadyExist){
        return res.status(403).send("User already exists")
    }

    const user : User = {
        id: crypto.randomUUID(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        username: req.body.username
    };

    await db.createUser(user);
    return res.sendStatus(200);
}