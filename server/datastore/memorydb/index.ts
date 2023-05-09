import { User, Recipe, Comment, Like, Group, JoinGroup } from "../../types";
import {DataStore} from "../index"

export class InMemory implements DataStore{
    private users : User[] = [];
    private recipes : Recipe[] = [];
    private likes : Like[] = [];
    private comments : Comment[] = [];
    private groups : Group[] = [];
    private joinGroups : JoinGroup[] = [];

    // UserDao Methodes
    createUser(user: User): Promise<void> {
        this.users.push(user);
        // if the return type is void
        return Promise.resolve();
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(u => u.email == email));
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(u => u.username == username));
    }
    joinGroup(joinedGroup : JoinGroup) : Promise<void> {
        this.joinGroups.push(joinedGroup);
        return Promise.resolve()
    }
    // RecipeDao Methodes
    listAllRecipes(): Promise<Recipe[]> {
        return Promise.resolve(this.recipes);
    }
    createRecipe(recipe: Recipe): Promise<void> {
        this.recipes.push(recipe);
        return Promise.resolve()
    }
    getRecipeById(id: string): Promise<Recipe | undefined> {
        return Promise.resolve(this.recipes.find(r => r.id == id));
    }
    deleteRecipe(id: string): Promise<void> {
        const index = this.recipes.findIndex(r => r.id == id);
        if(index == -1) return Promise.resolve();

        // Remove one item in this index
        this.recipes.splice(index, 1);
        return Promise.resolve();
    }
    // CommentDao Methodes
    createComment(comment: Comment): Promise<void> {
        this.comments.push(comment);
        return Promise.resolve();
    }
    listAllComments(recipeID: string): Promise<Comment[]> {
        return Promise.resolve(this.comments.filter(c => c.recipeId == recipeID));
    }
    deleteComment(id: string): Promise<void> {
        const index = this.comments.findIndex(c => c.id == id);
        if(index == -1) return Promise.resolve();

        this.comments.splice(index, 1);
        return Promise.resolve();
    }
    // LikeDao Methodes
    createLike(like: Like): Promise<void> {
        this.likes.push(like);
        return Promise.resolve();
    }
    // GroupDao Methodes
    createGroup(group : Group) : Promise<void>{
        this.groups.push(group);
        return Promise.resolve();
    }
    getGroupById(id : string) : Promise<Group | undefined>{
        return Promise.resolve(this.groups.find(g => g.id == id));
    }
    listAllGroups() : Promise<Group[]>{
        //returns only the public groups
        return Promise.resolve(this.groups.filter(g => g.isPrivate != true));
    }
    listMyGroups(userId : string) : Promise<Group[]> {
        //TODO: Return the Groups joined me the logged in user only
        return Promise.resolve(this.groups)
    }
    deleteGroup(id : string) : Promise<void>{
        //TODO
        const index = this.groups.findIndex(g => g.id == id);
        return Promise.resolve()
    }
    //JoinGroupDao Methodes
    createJoinGroup(groupId : string, userId : string) : Promise<JoinGroup>{
        const obj: JoinGroup = {
            userId: userId,
            groupId: groupId
        }

        return Promise.resolve(obj);
    }
}