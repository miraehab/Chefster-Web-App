import {JoinGroup} from '../types'

export interface JoinGroupDao {
    createJoinGroup(groupId : string, userId : string) : JoinGroup;
}