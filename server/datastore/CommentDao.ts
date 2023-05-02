// DAO = Data Access Object
// provides an abstract interface to some type of database
// provides data operations without exposing database details
import {Comment} from "../types"

export interface CommentDao{
    createComment(comment : Comment) : void;
    listAllComments(recipeID : string) : Comment[];
    deleteComment(id : string) : void;
}