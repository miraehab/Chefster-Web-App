export interface User{
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string
}

export interface Recipe{
    id: string;
    title: string;
    instructions: string;
    ingredients: [];
    Cuisine: string;
    userId: string;
    postedAt: number
}

export interface Like{
    userId: string;
    recipeId: string
}

export interface Comment{
    id: string;
    userId: string;
    recipeId: string;
    comment: string;
    postedAt: number
}