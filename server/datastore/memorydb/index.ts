import { User, Recipe, Comment, Like } from "../../types";
import {DataStore} from "../index"

export class InMemory implements DataStore{
    private users : User[] = [];
    private recipes : Recipe[] = [];
    private likes : Like[] = [];
    private comments : Comment[] = [];

    createUser(user: User): void {
        this.users.push(user);
    }
    getUserByEmail(email: string): User | undefined {
        return this.users.find(u => u.email == email);
    }
    getUserByUsername(username: string): User | undefined {
        return this.users.find(u => u.username == username);
    }
    listAllRecipes(): Recipe[] {
        return this.recipes;
    }
    createRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
    }
    getRecipe(id: string): Recipe | undefined {
        return this.recipes.find(r => r.id == id);
    }
    deleteRecipe(id: string): void {
        const index = this.recipes.findIndex(r => r.id == id);
        if(index == -1) return;

        // Remove one item in this index
        this.recipes.splice(index, 1);
    }
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
    createLike(like: Like): void {
        this.likes.push(like);
    }
}