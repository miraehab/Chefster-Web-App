// DAO = Data Access Object
// provides an abstract interface to some type of database
// provides data operations without exposing database details
import {Comment} from "../../types"

export interface CommentDao{
    createComment(comment : Comment) : Promise<void>;
    listAllComments(recipeID : string) : Promise<Comment[]>;
    getCommentById(commentId : string) : Promise<Comment | undefined>;
    deleteComment(id : string) : Promise<void>;
}