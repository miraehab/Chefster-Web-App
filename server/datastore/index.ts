import {UserDao} from "./UserDao"
import {CommentDao} from "./CommentDao"
import {LikeDao} from "./LikeDao"
import {RecipeDao} from "./RecipeDao"

export interface DataStore extends UserDao, RecipeDao, CommentDao, LikeDao{}