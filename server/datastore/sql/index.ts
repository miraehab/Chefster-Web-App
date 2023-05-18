import { DataStore } from "..";
import { User, JoinGroup, Recipe, Comment, Like, Group } from "../../types";
import { open as sqliteOpen} from "sqlite"
import  sqlite3 from "sqlite3";
import path from "path"

export class sqlDataStore implements DataStore{
    public async openDb(){
        // Open the Database
        const db = await sqliteOpen({
            filename: path.join(__dirname, "chefsterdb.sqlite"),
            driver: sqlite3.Database
        })

        await db.migrate({
            migrationsPath: path.join(__dirname, "migrations")
        })

        return this;
    }
    createUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    joinGroup(joinedGroup: JoinGroup): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listAllRecipes(): Promise<Recipe[]> {
        throw new Error("Method not implemented.");
    }
    createRecipe(recipe: Recipe): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getRecipeById(id: string): Promise<Recipe | undefined> {
        throw new Error("Method not implemented.");
    }
    deleteRecipe(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listAllComments(recipeID: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createGroup(group: Group): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getGroupById(id: string): Promise<Group | undefined> {
        throw new Error("Method not implemented.");
    }
    listAllGroups(): Promise<Group[]> {
        throw new Error("Method not implemented.");
    }
    listMyGroups(userId: string): Promise<Group[]> {
        throw new Error("Method not implemented.");
    }
    deleteGroup(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createJoinGroup(groupId: string, userId: string): Promise<JoinGroup> {
        throw new Error("Method not implemented.");
    }

}