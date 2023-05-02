import {UserDao} from "./UserDao"
import {CommentDao} from "./CommentDao"
import {LikeDao} from "./LikeDao"
import {RecipeDao} from "./RecipeDao"
import { InMemory } from "./memorydb"

export interface DataStore extends UserDao, RecipeDao, CommentDao, LikeDao{}

// Singelton -> one class object.
export const db = new InMemory();