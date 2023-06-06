import { CreateGroupRequest, CreateGroupResponse, DeleteGroupParam, DeleteGroupRequest, DeleteGroupResponse, ListAllGroupsRequest, ListAllGroupsResponse, ListUserCreatedGroupsRequest, ListUserCreatedGroupsResponse, ListUserJoinedGroupsRequest, ListUserJoinedGroupsResponse } from "../api";
import { ExpressHandler, ExpressHandlerWithParams, Group } from "../types";
import { db } from '../datastore'
import { getUserId } from "../utils/getUserId";
import crypto from 'crypto'

export const createGroupHandler : ExpressHandler<CreateGroupRequest, CreateGroupResponse> = async (req, res) => {
    if(!req.body.groupName || req.body.isPrivate === undefined){
        return res.status(400).send({error: "GroupName and isPrivate are required"});
    }

    if(req.body.isPrivate && !req.body.groupPass){
        return res.status(400).send({error: "Your Group is Private It Should have a Password"});
    }

    const group : Group = {
        id: crypto.randomUUID(),
        groupName: req.body.groupName,
        groupCreatorId: getUserId(req.headers.authorization),
        isPrivate: req.body.isPrivate,
        groupPass: req.body.groupPass? req.body.groupPass : "",
        createTime: Date.now()
    }

    await db.createGroup(group);

    return res.sendStatus(201);
}

export const listAllGroupsHandler : ExpressHandler<ListAllGroupsRequest, ListAllGroupsResponse> = async (req, res) => {
    const groups = await db.listAllGroups();

    if(!groups){
        return res.status(404).send({error: "No Groups Found"});
    }

    return res.status(200).send({groups});
}

export const listuserJoinedGroupsHandler : ExpressHandler<ListUserJoinedGroupsRequest, ListUserJoinedGroupsResponse> = async (req, res) => {
    const userId = getUserId(req.headers.authorization);

    if(!userId){
        return res.status(401).send({error: "Invalid User"});
    }

    const userGroups = await db.listUserJoinedGroups(userId);
    if(!userGroups){
        res.status(404).send({error: "Groups Not found"})
    }

    return res.status(200).send({userGroups})
}

export const listuserCreatedGroupsHandler : ExpressHandler<ListUserCreatedGroupsRequest, ListUserCreatedGroupsResponse> = async (req, res) => {
    const userId = getUserId(req.headers.authorization);

    if(!userId){
        return res.status(401).send({error: "Invalid User"});
    }

    const createdGroups = await db.listUserCreatedGroups(userId);

    if(!createdGroups){
        res.status(404).send({error: "Created Groups Not Found"});
    }

    return res.status(200).send({createdGroups});
}

export const deleteGroupHandler : ExpressHandlerWithParams<DeleteGroupParam, DeleteGroupRequest, DeleteGroupResponse> = async (req, res) =>{
    const groupId = req.params.groupId;
    const userId = getUserId(req.headers.authorization);

    if(!groupId){
        return res.status(400).send({error: "Invalid Request"})
    }

    const group = await db.getGroupById(groupId);
    if(!group){
        return res.status(404).send({error: "Group Not Found!"});
    }

    // To check that the user who wants to delte the recipe is the same who posted it
    if(group.groupCreatorId !== userId){
        return res.status(400).send({error: "You should delete your own Group!"});
    }

    await db.deleteGroup(groupId);

    return res.sendStatus(200);
}