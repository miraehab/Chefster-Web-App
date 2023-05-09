// DAO = Data Access Object
// provides an abstract interface to some type of database
// provides data operations without exposing database details
import {User, JoinGroup} from "../../types"

export interface UserDao{
    createUser(user : User) : Promise<void>;
    getUserByEmail(email : string) : Promise<User | undefined>;
    getUserByUsername(username : string) : Promise<User | undefined>;
    joinGroup(joinedGroup : JoinGroup) : Promise<void>;
}