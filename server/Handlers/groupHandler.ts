import { ListAllGroupsRequest, ListAllGroupsResponse } from "../api";
import { ExpressHandler } from "../types";
import { db } from '../datastore'

export const listAllGroupsHandler : ExpressHandler<ListAllGroupsRequest, ListAllGroupsResponse> = async (req, res) => {
    const groups = await db.listAllGroups();

    if(!groups){
        return res.status(404).send({error: "No Groups Found"});
    }

    console.log(groups);

    return res.status(200).send({groups});
}