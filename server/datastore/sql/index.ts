import { DataStore } from "..";
import { User, JoinGroup, Recipe, Comment, Like, Group, Ingredient, RecipeIngredient } from "../../types";
import { open as sqliteOpen, Database} from "sqlite"
import  sqlite3 from "sqlite3";
import path from "path"
import { SEED_COMMENT_1, SEED_COMMENT_2, SEED_COMMENT_3, SEED_COMMENT_4, SEED_GROUP_1, SEED_GROUP_2, SEED_GROUP_3, SEED_Group_2_PASSWORD, SEED_INGREDIENT_1, SEED_INGREDIENT_10, SEED_INGREDIENT_2, SEED_INGREDIENT_3, SEED_INGREDIENT_4, SEED_INGREDIENT_5, SEED_INGREDIENT_6, SEED_INGREDIENT_7, SEED_INGREDIENT_8, SEED_INGREDIENT_9, SEED_JOIN_GROUP_1, SEED_JOIN_GROUP_2, SEED_JOIN_GROUP_3, SEED_JOIN_GROUP_4, SEED_JOIN_GROUP_5, SEED_LIKE_1, SEED_LIKE_2, SEED_LIKE_3, SEED_LIKE_4, SEED_RECIPE_1, SEED_RECIPE_2, SEED_RECIPE_3, SEED_RECIPE_INGREDIENT_1, SEED_RECIPE_INGREDIENT_10, SEED_RECIPE_INGREDIENT_11, SEED_RECIPE_INGREDIENT_12, SEED_RECIPE_INGREDIENT_13, SEED_RECIPE_INGREDIENT_14, SEED_RECIPE_INGREDIENT_2, SEED_RECIPE_INGREDIENT_3, SEED_RECIPE_INGREDIENT_4, SEED_RECIPE_INGREDIENT_5, SEED_RECIPE_INGREDIENT_6, SEED_RECIPE_INGREDIENT_7, SEED_RECIPE_INGREDIENT_8, SEED_RECIPE_INGREDIENT_9, SEED_USER, SEED_USER_2, SEED_USER_3, SEED_USER_PASSWORD, SEED_USER_PASSWORD2, SEED_USER_PASSWORD3 } from "./seed";
import { hashPassword } from "../../utils/hashPassword";

export class sqlDataStore implements DataStore{
    // the ! here is because of typescript
    // and Database<sqlite3.Database, sqlite3.Statement> is the return type of open function in sqlite
    private db! : Database<sqlite3.Database, sqlite3.Statement>;

    public async openDb(dbPath: string){
        // Open the Database
        this.db = await sqliteOpen({
            filename: dbPath,
            driver: sqlite3.Database
        })
        
        this.db.run('PRAGMA foreign_keys = ON;')
        
        await this.db.migrate({
            migrationsPath: path.join(__dirname, "migrations")
        })
        
        if (dbPath == ":memory:") {
            await this.seedDb();
        }
        
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
    async joinGroup(group : Group, userId : string): Promise<void> {
        await this.createJoinGroup(group.id, userId);
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
    async createLike(like: Like): Promise<void> {
        await this.db.run('INSERT INTO Like (id, userId, recipeId) VALUES (?, ?, ?)', like.id, like.userId, like.recipeId);
    }
    async getLike(recipeId : string, userId : string) : Promise<Like | undefined>{
        return this.db.get<Like>('SELECT * FROM Like as l WHERE l.recipeId = (?) AND l.userId = (?)', recipeId, userId);
    }
    async deleteLike(likeId : string) : Promise<void>{
        await this.db.run('DELETE FROM Like as l WHERE l.id = (?)', likeId);
    }

    // GroupDao Methodes
    async createGroup(group: Group): Promise<void> {
        await this.db.run('INSERT INTO [Group] (id, groupName, groupCreatorId, isPrivate, groupPass, createTime) VALUES (?, ?, ? ,?, ?, ?)', group.id, group.groupName, group.groupCreatorId, group.isPrivate, group.groupPass, group.createTime);
        // To add the creator as the first member in the group
        await this.createJoinGroup(group.id, group.groupCreatorId);
    }
    async getGroupById(id: string): Promise<Group | undefined> {
        return this.db.get<Group>('SELECT * FROM [Group] as g WHERE g.id = (?)', id);
    }
    async getGroupByPass(groupPass: string): Promise<Group | undefined> {
        return this.db.get<Group>('SELECT * FROM [Group] as g WHERE g.groupPass = (?)', groupPass);
    }
    async listAllGroups(): Promise<Group[] | undefined> {
        return await this.db.all<Group[]>('SELECT * FROM [Group] as g WHERE g.isPrivate = 0');
    }
    async listUserJoinedGroups(userId: string): Promise<Group[] | undefined> {
        return await this.db.all<Group[]>('SELECT * FROM [Group] as g WHERE g.id in (SELECT groupId FROM JoinGroup as jg WHERE jg.userId = (?))', userId);
    }
    async listUserCreatedGroups(userId: string) : Promise<Group[] | undefined>{
        return await this.db.all<Group[]>('SELECT * FROM [Group] as g WHERE g.groupCreatorId = (?)', userId);
    }
    async deleteGroup(id: string): Promise<void> {
        await this.db.run('DELETE FROM [Group] as g WHERE g.id = (?)', id);
    }

    // JoinGroupDao Methodes
    async createJoinGroup(groupId: string, userId: string): Promise<void> {
        await this.db.run('INSERT INTO JoinGroup (userId, groupId) VALUES (?, ?)', userId, groupId);
    }
    checkIfMember(userId: string, groupId: string) : Promise<JoinGroup | undefined> {
        return this.db.get<JoinGroup>('SELECT * FROM JoinGroup as jg WHERE jg.userId = (?) AND jg.groupId = (?)', userId, groupId);
    }

    private seedDb = async () => {
        // create the users
        SEED_USER.password = hashPassword(SEED_USER_PASSWORD);
        await this.createUser(SEED_USER);
        SEED_USER_2.password = hashPassword(SEED_USER_PASSWORD2);
        await this.createUser(SEED_USER_2);
        SEED_USER_3.password = hashPassword(SEED_USER_PASSWORD3);
        await this.createUser(SEED_USER_3);
      
        // create the ingredients
        await this.createIngredient(SEED_INGREDIENT_1);
        await this.createIngredient(SEED_INGREDIENT_2);
        await this.createIngredient(SEED_INGREDIENT_3);
        await this.createIngredient(SEED_INGREDIENT_4);
        await this.createIngredient(SEED_INGREDIENT_5);
        await this.createIngredient(SEED_INGREDIENT_6);
        await this.createIngredient(SEED_INGREDIENT_7);
        await this.createIngredient(SEED_INGREDIENT_8);
        await this.createIngredient(SEED_INGREDIENT_9);
        await this.createIngredient(SEED_INGREDIENT_10);
      
        // create the recipes
        await this.createRecipe(SEED_RECIPE_1);
        await this.createRecipe(SEED_RECIPE_2);
        await this.createRecipe(SEED_RECIPE_3);
      
        // create the recipe ingredients
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_1);
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_2);
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_3);
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_4);
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_5);
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_6);
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_7);
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_8);
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_9);
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_10);
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_11);
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_12);
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_13);
        await this.createRecipeIngredient(SEED_RECIPE_INGREDIENT_14);
      
        // create the likes
        await this.createLike(SEED_LIKE_1);
        await this.createLike(SEED_LIKE_2);
        await this.createLike(SEED_LIKE_3);
        await this.createLike(SEED_LIKE_4);
      
        // create the comments
        await this.createComment(SEED_COMMENT_1);
        await this.createComment(SEED_COMMENT_2);
        await this.createComment(SEED_COMMENT_3);
        await this.createComment(SEED_COMMENT_4);
    
        // create the groups
        await this.createGroup(SEED_GROUP_1);
        SEED_GROUP_2.groupPass = hashPassword(SEED_Group_2_PASSWORD);
        await this.createGroup(SEED_GROUP_2);
        await this.createGroup(SEED_GROUP_3);
        
        // create the join groups
        await this.createJoinGroup(SEED_JOIN_GROUP_1.groupId, SEED_JOIN_GROUP_1.userId);
        await this.createJoinGroup(SEED_JOIN_GROUP_2.groupId, SEED_JOIN_GROUP_2.userId);
        await this.createJoinGroup(SEED_JOIN_GROUP_3.groupId, SEED_JOIN_GROUP_3.userId);
        await this.createJoinGroup(SEED_JOIN_GROUP_4.groupId, SEED_JOIN_GROUP_4.userId);
        await this.createJoinGroup(SEED_JOIN_GROUP_5.groupId, SEED_JOIN_GROUP_5.userId);
    };
}