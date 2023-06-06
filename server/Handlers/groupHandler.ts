import { ListAllGroupsRequest, ListAllGroupsResponse, ListUserJoinedGroupsRequest, ListUserJoinedGroupsResponse } from "../api";
import { ExpressHandler } from "../types";
import { db } from '../datastore'
import { getUserId } from "../utils/getUserId";

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

