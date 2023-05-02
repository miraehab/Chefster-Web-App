// DAO = Data Access Object
// provides an abstract interface to some type of database
// provides data operations without exposing database details
import {Like} from "../types"

export interface LikeDao{
    createLike(like : Like) : void;
}