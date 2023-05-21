import { DataStore } from "..";
import { User, JoinGroup, Recipe, Comment, Like, Group, Ingredient, RecipeIngredient } from "../../types";
import { open as sqliteOpen, Database} from "sqlite"
import  sqlite3 from "sqlite3";
import path from "path"

export class sqlDataStore implements DataStore{
    // the ! here is because of typescript
    // and Database<sqlite3.Database, sqlite3.Statement> is the return type of open function in sqlite
    private db! : Database<sqlite3.Database, sqlite3.Statement>;

    public async openDb(){
        // Open the Database
        this.db = await sqliteOpen({
            filename: path.join(__dirname, "chefsterdb.sqlite"),
            driver: sqlite3.Database
        })

        this.db.run('PRAGMA foreign_keys = ON;')

        await this.db.migrate({
            migrationsPath: path.join(__dirname, "migrations")
        })

        return this;
    }

    // UserDao Methodes
    async createUser(user: User): Promise<void> {
        await this.db.run('INSERT INTO User (id, firstName, lastName, username, password, email) VALUES (?, ?, ?, ?, ?, ?)', user.id, user.firstName, user.lastName, user.username, user.password, user.email)
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>('SELECT *, userName as username FROM User as u WHERE u.email = (?)', email);
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        return this.db.get<User>('SELECT *, userName as username FROM User as u WHERE u.userName = (?)', username);
    }
    getUserById(id : string) : Promise<User | undefined>{
        return this.db.get<User>('SELECT *, userName as username FROM User as u WHERE u.id = (?)', id);
    }
    joinGroup(joinedGroup: JoinGroup): Promise<void> {
        throw new Error("Method not implemented.");
    }

    // RecipeDao Methodes
    listAllRecipes(): Promise<Recipe[]> {
        return this.db.all<Recipe[]>('SELECT * FROM Recipe');
    }
    async createRecipe(recipe: Recipe): Promise<void> {
        await this.db.run('INSERT INTO Recipe (id, title, instruction, cusine, userId, postedAt) VALUES (?, ?, ?, ?, ?, ?)', recipe.id, recipe.title, recipe.instructions, recipe.cuisine, recipe.userId, recipe.postedAt);
    }
    getRecipeById(id: string): Promise<Recipe | undefined> {
        return this.db.get<Recipe>('SELECT * FROM Recipe as r WHERE r.id = (?)', id);
    }
    async deleteRecipe(id: string): Promise<void> {
        await this.db.run('DELETE FROM Recipe as r WHERE r.id = (?)', id);
    }

    // IngredientDao Methodes
    async createIngredient(ingredient : Ingredient) : Promise<void>{
        await this.db.run('INSERT INTO Ingredient (id, ingredient) VALUES (?, ?)', ingredient.id, ingredient.ingredientName);
    }
    getIngredient(ingredientName : string) : Promise<Ingredient | undefined>{
        return this.db.get<Ingredient>('SELECT * FROM Ingredient as i WHERE i.ingredient = (?)', ingredientName);
    }

    // RecipeIgredientDao Methodes
    async createRecipeIngredient(recipeIngredient : RecipeIngredient) : Promise<void>{
        await this.db.run('INSERT INTO RecipeIngredient (recipeId, ingredientId) VALUES (?, ?)', recipeIngredient.recipeId, recipeIngredient.ingredientId)
    }

    // CommentDao Methodes
    async createComment(comment: Comment): Promise<void> {
        await this.db.run('INSERT INTO Comment (id, userId, recipeId, comment, postedAt) Values (?, ?, ?, ?, ?)', comment.id, comment.userId, comment.recipeId, comment.comment, comment.postedAt);
    }
    listAllComments(recipeID: string): Promise<Comment[]> {
        return this.db.all<Comment[]>('SELECT * FROM Comment as c WHERE c.recipeId = (?)', recipeID);
    }
    getCommentById(commentId : string) : Promise<Comment | undefined>{
        return this.db.get<Comment>('SELECT * FROM Comment as c WHERE c.id = (?)', commentId);
    }
    async deleteComment(id: string): Promise<void> {
        await this.db.run('DELETE FROM Comment as c WHERE c.id = (?)', id);
    }

    // LikeDao Methodes
    createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }

    // GroupDao Methodes
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

    // JoinGroupDao Methodes
    createJoinGroup(groupId: string, userId: string): Promise<JoinGroup> {
        throw new Error("Method not implemented.");
    }

}