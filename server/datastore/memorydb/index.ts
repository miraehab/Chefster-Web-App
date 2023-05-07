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
    createUser(user: User): void {
        this.users.push(user);
    }
    getUserByEmail(email: string): User | undefined {
        return this.users.find(u => u.email == email);
    }
    getUserByUsername(username: string): User | undefined {
        return this.users.find(u => u.username == username);
    }
    joinGroup(joinedGroup : JoinGroup) : void {
        this.joinGroups.push(joinedGroup);
    }
    // RecipeDao Methodes
    listAllRecipes(): Recipe[] {
        return this.recipes;
    }
    createRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
    }
    getRecipeById(id: string): Recipe | undefined {
        return this.recipes.find(r => r.id == id);
    }
    deleteRecipe(id: string): void {
        const index = this.recipes.findIndex(r => r.id == id);
        if(index == -1) return;

        // Remove one item in this index
        this.recipes.splice(index, 1);
    }
    // CommentDao Methodes
    createComment(comment: Comment): void {
        this.comments.push(comment);
    }
    listAllComments(recipeID: string): Comment[] {
        return this.comments.filter(c => c.recipeId == recipeID);
    }
    deleteComment(id: string): void {
        const index = this.comments.findIndex(c => c.id == id);
        if(index == -1) return;

        this.comments.splice(index, 1);
    }
    // LikeDao Methodes
    createLike(like: Like): void {
        this.likes.push(like);
    }
    // GroupDao Methodes
    createGroup(group : Group) : void{
        this.groups.push(group);
    }
    getGroupById(id : string) : Group | undefined{
        return this.groups.find(g => g.id == id);
    }
    listAllGroups() : Group[]{
        //returns only the public groups
        return this.groups.filter(g => g.isPrivate != true);
    }
    listMyGroups(userId : string) : Group[] {
        //TODO: Return the Groups joined me the logged in user only
        return this.groups
    }
    deleteGroup(id : string) : void{
        const index = this.groups.findIndex(g => g.id == id);
    }
    //JoinGroupDao Methodes
    createJoinGroup(groupId : string, userId : string) : JoinGroup{
        const obj: JoinGroup = {
            userId: userId,
            groupId: groupId
        }

        return obj;
    }
}