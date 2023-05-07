import {Group} from'../types'

export interface GroupDao{
    createGroup(group : Group) : void;
    getGroupById(id : string) : Group | undefined;
    listAllGroups() : Group[];
    listMyGroups(userId : string) : Group[];
    deleteGroup(id : string) : void;
}