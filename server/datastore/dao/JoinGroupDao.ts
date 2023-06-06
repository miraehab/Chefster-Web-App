import {JoinGroup} from '../../types'

export interface JoinGroupDao {
    createJoinGroup(groupId : string, userId : string) : Promise<void>;
    checkIfMember(userId: string, groupId: string) : Promise<JoinGroup | undefined>
}