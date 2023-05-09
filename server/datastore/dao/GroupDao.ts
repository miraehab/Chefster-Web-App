import {Group} from'../../types'

export interface GroupDao{
    createGroup(group : Group) : Promise<void>;
    getGroupById(id : string) : Promise<Group | undefined>;
    listAllGroups() : Promise<Group[]>;
    listMyGroups(userId : string) : Promise<Group[]>;
    deleteGroup(id : string) : Promise<void>;
}