// DAO = Data Access Object
// provides an abstract interface to some type of database
// provides data operations without exposing database details
import {User, JoinGroup} from "../types"

export interface UserDao{
    createUser(user : User) : void;
    getUserByEmail(email : string) : User | undefined;
    getUserByUsername(username : string) : User | undefined;
    joinGroup(joinedGroup : JoinGroup) : void;
}