import { CreateGroupRequest, CreateGroupResponse, DeleteGroupParam, DeleteGroupRequest, DeleteGroupResponse, GetGroupParam, GetGroupRequest, GetGroupResponse, ListAllGroupsRequest, ListAllGroupsResponse, ListGroupMembersParam, ListGroupMembersRequest, ListGroupMembersResponse, ListUserCreatedGroupsRequest, ListUserCreatedGroupsResponse, ListUserJoinedGroupsRequest, ListUserJoinedGroupsResponse, joinGroupParam, joinGroupRequest, joinGroupResponse } from "../api";
import { ExpressHandler, ExpressHandlerWithParams, Group } from "../types";
import { db } from '../datastore'
import { getUserId } from "../utils/getUserId";
import crypto from 'crypto'
import { SEED_GROUP_2, SEED_GROUP_3 } from "../datastore/sql/seed";

export const createGroupHandler : ExpressHandler<CreateGroupRequest, CreateGroupResponse> = async (req, res) => {
    if(!req.body.groupName || req.body.groupName.trim() == "" || req.body.isPrivate === undefined){
        return res.status(400).send({error: "GroupName and isPrivate are required"});
    }

    if(req.body.isPrivate === true && (!req.body.groupPass || req.body.groupPass?.trim() == "")){
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

export const listUserJoinedGroupsHandler : ExpressHandler<ListUserJoinedGroupsRequest, ListUserJoinedGroupsResponse> = async (req, res) => {
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

export const listUserCreatedGroupsHandler : ExpressHandler<ListUserCreatedGroupsRequest, ListUserCreatedGroupsResponse> = async (req, res) => {
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
    const groupId = req.params.id;
    const userId = getUserId(req.headers.authorization);

    if(!groupId){
        return res.status(400).send({error: "Invalid Request"})
    }

    const group = await db.getGroupById(groupId);
    if(!group){
        return res.status(404).send({error: "Group Not Found!"});
    }

    // To check that the user who wants to delete the recipe is the same who posted it
    if(group.groupCreatorId !== userId){
        return res.status(400).send({error: "You should delete your own Group!"});
    }

    await db.deleteGroup(groupId);

    return res.sendStatus(200);
}

export const getGroupHandler : ExpressHandlerWithParams<GetGroupParam, GetGroupRequest, GetGroupResponse> = async (req, res) => {
    const groupId = req.params.id;
    const userId = getUserId(req.headers.authorization);
    if(!groupId){
        return res.status(400).send({error: "Invalid Group Id"});
    }

    const group = await db.getGroupById(groupId);
    if(!group){
        return res.status(404).send({error: "Group Not Found"});
    }

    // Check if the group is private and the user is not a member
    const isMember = await db.checkIfMember(userId, groupId);
    if(group.isPrivate && !isMember){
        return res.status(401).send({error: "It's a Private group and you are not a member."});
    }

    return res.status(200).send({group});
}

export const joinGroupHandler : ExpressHandlerWithParams<joinGroupParam, joinGroupRequest, joinGroupResponse> = async (req, res) => {
    const groupPass = req.body.groupPass;
    const groupId = req.params.id;
    const userId = getUserId(req.headers.authorization);

    // If Private
    if(groupPass && groupPass != ""){
        const group = await db.getGroupByPass(groupPass);

        if(!group){
            return res.status(404).send({error: "Group Not Found."});
        }

        await db.createJoinGroup(group.id, userId);

        return res.sendStatus(200);
    }else{
        if(!groupId){
            return res.status(400).send({error: "Invalid Group Id"});
        }

        const group = await db.getGroupById(groupId);
        console.log(groupId)
        if(!group){
            return res.status(404).send({error: "Group Not Found."});
        }

        await db.createJoinGroup(group.id, userId);

        return res.sendStatus(200);
    }
}

export const listGroupMembers : ExpressHandlerWithParams<ListGroupMembersParam, ListGroupMembersRequest, ListGroupMembersResponse> = async (req, res) => {
    const groupId = req.params.id;
    const userId = getUserId(req.headers.authorization);
    if(!groupId){
        return res.status(400).send({error: "Invalid Group Id"});
    }

    let members = await db.listGroupMembers(groupId);
    if(!members){
        return res.status(404).send({error: "Members Not Found."});
    }

    members = members.filter((item, index) => {
        return index === members?.findIndex((obj) => {
          return item.id === obj.id;
        });});

    return res.status(200).send({members});
}