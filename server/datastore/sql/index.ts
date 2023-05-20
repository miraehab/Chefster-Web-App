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
        return this.db.get<User>('SELECT * FROM User as u WHERE u.email = (?)', email);
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        return this.db.get<User>('SELECT *, userName as username FROM User as u WHERE u.userName = (?)', username);
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
        throw new Error("Method not implemented.");
    }
    deleteRecipe(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    // IngredientDao Methodes
    async createIngredient(ingredient : Ingredient) : Promise<void>{
        await this.db.run('INSERT INTO Ingredient (id, ingrdient) VALUES (?, ?)', ingredient.id, ingredient.ingredientName);
    }

    // RecipeIgredientDao Methodes
    async createRecipeIngredient(recipeIngredient : RecipeIngredient) : Promise<void>{
        await this.db.run('INSERT INTO RecipeIngredient (recipeId, ingrdientId) VALUES (?, ?)', recipeIngredient.recipeId, recipeIngredient.ingrdientId)
    }

    // CommentDao Methodes
    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listAllComments(recipeID: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
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