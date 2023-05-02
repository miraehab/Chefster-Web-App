// DAO = Data Access Object
// provides an abstract interface to some type of database
// provides data operations without exposing database details
import {User} from "../types"

export interface UserDao{
    createUser(user : User) : void;
    getUserByEmail(email : string) : User | undefined;
    getUserByUsername(username : string) : User | undefined;
}