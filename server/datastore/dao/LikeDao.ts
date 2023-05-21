// DAO = Data Access Object
// provides an abstract interface to some type of database
// provides data operations without exposing database details
import {Like} from "../../types"

export interface LikeDao{
    createLike(like : Like) : Promise<void>;
    getLike(recipeId : string, userId : string) : Promise<Like | undefined>;
    deleteLike(likeId : string) : Promise<void>
}