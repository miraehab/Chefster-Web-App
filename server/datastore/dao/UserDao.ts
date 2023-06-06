// DAO = Data Access Object
// provides an abstract interface to some type of database
// provides data operations without exposing database details
import {User, Group} from "../../types"

export interface UserDao{
    createUser(user : User) : Promise<void>;
    getUserByEmail(email : string) : Promise<User | undefined>;
    getUserByUsername(username : string) : Promise<User | undefined>;
    getUserById(id : string) : Promise<User | undefined>;
}