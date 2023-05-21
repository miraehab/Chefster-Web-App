import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../api";
import { signJwt } from "../auth";
import { db } from '../datastore'
import { ExpressHandler, User } from "../types";
import crypto from 'crypto';
import { hashPassword } from "../utils/hashPassword";

export const signUpHandler : ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    if(!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password || !req.body.username){
        return res.status(400).send({error: "All Fields are required"});
    }

    const alreadyExist = await db.getUserByEmail(req.body.email) || await db.getUserByUsername(req.body.username);
    if(alreadyExist){
        return res.status(403).send({error: "User already exists"});
    }

    const passwordHash = hashPassword(req.body.password)

    const user : User = {
        id: crypto.randomUUID(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: passwordHash,
        username: req.body.username
    };

    await db.createUser(user);
    const jwt = signJwt({userId: user.id});
    return res.status(200).send({
        jwt: jwt
    });
}

export const signInHandler : ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
    if(!req.body.login || !req.body.password){
        return res.sendStatus(400);
    }

    const passwordHash = hashPassword(req.body.password)

    const exist = await db.getUserByEmail(req.body.login) || await db.getUserByUsername(req.body.login);
    if(!exist || exist.password !== passwordHash){
        //unauthorized
        return res.sendStatus(403);
    }

    const jwt = signJwt({userId: exist.id});

    return res.status(200).send({
        user: {
            firstName: exist.firstName,
            lastName: exist.lastName,
            username: exist.username,
            email: exist.email,
            id: exist.id
        },
        jwt: jwt
    });
}