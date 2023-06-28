import { GetUserParam, GetUserRequest, GetUserResponse, SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../api";
import { signJwt } from "../auth";
import { db } from '../datastore'
import { ExpressHandler, ExpressHandlerWithParams, User } from "../types";
import crypto from 'crypto';
import { hashPassword } from "../utils/hashPassword";

export const signUpHandler : ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    if(!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password || !req.body.username || !req.body.image){
        return res.status(400).send({error: "All Fields are required"});
    }

    const alreadyExist = await db.getUserByEmail(req.body.email) || await db.getUserByUsername(req.body.username);
    if(alreadyExist){
        return res.status(403).send({error: "User already exists"});
    }

    const passwordHash = hashPassword(req.body.password)
    const dataUriToBuffer = require('data-uri-to-buffer');

    const user : User = {
        id: crypto.randomUUID(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: passwordHash,
        username: req.body.username,
        image: new Uint8Array(dataUriToBuffer(req.body.image))
    };

    await db.createUser(user);
    const jwt = signJwt({userId: user.id});
    return res.status(201).send({
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
        return res.status(403).send({error: "Invalid credentials!"});
    }

    const jwt = signJwt({userId: exist.id});

    return res.status(200).send({
        user: {
            firstName: exist.firstName,
            lastName: exist.lastName,
            username: exist.username,
            email: exist.email,
            id: exist.id,
            image: exist.image
        },
        jwt: jwt
    });
}

export const getUserHandler : ExpressHandlerWithParams<GetUserParam, GetUserRequest, GetUserResponse> = async (req, res) =>{
    const userId = req.params.id;
    if(!userId){
        return res.status(400).send({error: "Invalid User."})
    }

    const user = await db.getUserById(userId);
    if(!user){
        return res.status(404).send({error: "User Not Found"});
    }

    res.status(200).send({user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        id: user.id,
        image: user.image
    }});
}