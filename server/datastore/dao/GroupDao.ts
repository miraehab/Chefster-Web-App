import {Group} from'../../types'

export interface GroupDao{
    createGroup(group : Group) : Promise<void>;
    getGroupById(id : string) : Promise<Group | undefined>;
    listAllGroups() : Promise<Group[] | undefined>;
    listUserJoinedGroups(userId : string) : Promise<Group[] | undefined>;
    listUserCreatedGroups(userId: string) : Promise<Group[] | undefined>;
    deleteGroup(id : string) : Promise<void>;
}