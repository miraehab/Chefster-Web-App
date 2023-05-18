import {UserDao} from "./dao/UserDao"
import {CommentDao} from "./dao/CommentDao"
import {LikeDao} from "./dao/LikeDao"
import {RecipeDao} from "./dao/RecipeDao"
import { InMemory } from "./memorydb"
import { GroupDao } from "./dao/GroupDao"
import { JoinGroupDao } from "./dao/JoinGroupDao"

export interface DataStore extends UserDao, RecipeDao, CommentDao, LikeDao, GroupDao, JoinGroupDao{}

// Singelton -> one class object.
export let db : DataStore; 

export async function initDb(){
    db = new InMemory();
}