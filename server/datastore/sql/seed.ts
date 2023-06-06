// import the entities and other modules
import { User, Recipe, Ingredient, RecipeIngredient, Like, Comment, Group, JoinGroup } from "../../types";
import crypto from 'crypto'

// create a constant for the seed user password
export const SEED_USER_PASSWORD = "SeedUserPassword";

// create some dummy users
export const SEED_USER: User = {
  id: crypto.randomUUID(),
  firstName: "Alice",
  lastName: "Smith",
  username: "alice123",
  password: "", // hashPassword(SEED_USER_PASSWORD)
  email: "alice@gmail.com"
};

export const SEED_USER_PASSWORD2 = "SeedUserPassword2";

export const SEED_USER_2: User = {
  id: crypto.randomUUID(),
  firstName: "Bob",
  lastName: "Jones",
  username: "bob456",
  password: "", // hashPassword(SEED_USER_PASSWORD2)
  email: "bob@yahoo.com"
};

export const SEED_USER_PASSWORD3 = "SeedUserPassword3";

export const SEED_USER_3: User = {
  id: crypto.randomUUID(),
  firstName: "Charlie",
  lastName: "Brown",
  username: "charlie789",
  password: "", // hashPassword(SEED_USER_PASSWORD3)
  email: "charlie@hotmail.com"
};

// create some dummy ingredients
export const SEED_INGREDIENT_1: Ingredient = {
  id: crypto.randomUUID(),
  ingredientName: "flour"
};

export const SEED_INGREDIENT_2: Ingredient = {
  id: crypto.randomUUID(),
  ingredientName: "eggs"
};

export const SEED_INGREDIENT_3: Ingredient = {
  id: crypto.randomUUID(),
  ingredientName: "milk"
};

export const SEED_INGREDIENT_4: Ingredient = {
  id: crypto.randomUUID(),
  ingredientName: "butter"
};

export const SEED_INGREDIENT_5: Ingredient = {
  id: crypto.randomUUID(),
  ingredientName: "sugar"
};

export const SEED_INGREDIENT_6: Ingredient = {
  id: crypto.randomUUID(),
  ingredientName: "chocolate chips"
};

export const SEED_INGREDIENT_7: Ingredient = {
  id: crypto.randomUUID(),
  ingredientName: "bananas"
};

export const SEED_INGREDIENT_8: Ingredient = {
    id: crypto.randomUUID(),
    ingredientName: "oil"
};
  
export const SEED_INGREDIENT_9: Ingredient = {
    id: crypto.randomUUID(),
    ingredientName: "onion"
};

export const SEED_INGREDIENT_10: Ingredient = {
    id: crypto.randomUUID(),
    ingredientName: "garlic"
};

// create some dummy recipes
export const SEED_RECIPE_1: Recipe = {
    id: crypto.randomUUID(),
    title: "Banana Bread",
    instructions:
      `1. Preheat oven to 180°C (160ºC fan) and line a 9"-x-5" loaf pan with parchment paper.
  2. In a large bowl, mash bananas with a fork. Stir in melted butter, sugar, egg, vanilla, and salt.
  3. Add flour and baking soda and stir until just combined. Fold in chocolate chips if using.
  4. Transfer batter to prepared pan and bake for 50 to 60 minutes, or until a toothpick inserted into the center comes out clean.
  5. Let bread cool slightly in pan, then transfer to a wire rack to cool completely.`,
    cuisine: "American",
    userId: SEED_USER.id,
    postedAt: Date.now()
  };
  
export const SEED_RECIPE_2: Recipe = {
    id: crypto.randomUUID(),
    title: "Chocolate Chip Cookies",
    instructions:
        `1. Preheat oven to 180°C (160ºC fan) and line two baking sheets with parchment paper.
    2. In a large bowl, cream together butter and sugars until light and fluffy. Add eggs and vanilla and beat well.
    3. In a medium bowl, whisk together flour, baking soda, and salt. Gradually add to butter mixture and stir until well combined. Stir in chocolate chips.
    4. Drop by rounded tablespoonfuls onto prepared baking sheets, leaving some space between them. Bake for 10 to 12 minutes or until golden around the edges.
    5. Let cookies cool on baking sheets for 5 minutes, then transfer to a wire rack to cool completely.`,
    cuisine: "American",
    userId: SEED_USER_2.id,
    postedAt: Date.now()
};

export const SEED_RECIPE_3: Recipe = {
    id: crypto.randomUUID(),
    title: "Garlic Bread",
    instructions:
        `1. Preheat oven to 200°C (180ºC fan) and line a baking sheet with foil.
    2. In a small bowl, stir together butter, garlic, parsley, salt, and pepper until well combined.
    3. Cut bread into slices, but not all the way through. Spread butter mixture on both sides of each slice.
    4. Wrap bread in foil and bake for 15 minutes or until butter is melted and bread is warm.
    5. Unwrap bread and serve hot or warm.`,
    cuisine: "European",
    userId: SEED_USER_3.id,
    postedAt: Date.now()
};

// create some dummy recipe ingredients
export const SEED_RECIPE_INGREDIENT_1: RecipeIngredient = {
    recipeId: SEED_RECIPE_1.id,
    ingredientId: SEED_INGREDIENT_7.id
};

export const SEED_RECIPE_INGREDIENT_2: RecipeIngredient = {
    recipeId: SEED_RECIPE_1.id,
    ingredientId: SEED_INGREDIENT_4.id
};

export const SEED_RECIPE_INGREDIENT_3: RecipeIngredient = {
    recipeId: SEED_RECIPE_1.id,
    ingredientId: SEED_INGREDIENT_5.id
};

export const SEED_RECIPE_INGREDIENT_4: RecipeIngredient = {
    recipeId: SEED_RECIPE_1.id,
    ingredientId: SEED_INGREDIENT_2.id
};

export const SEED_RECIPE_INGREDIENT_5: RecipeIngredient = {
    recipeId: SEED_RECIPE_1.id,
    ingredientId: SEED_INGREDIENT_1.id
};

export const SEED_RECIPE_INGREDIENT_6: RecipeIngredient = {
    recipeId: SEED_RECIPE_1.id,
    ingredientId: SEED_INGREDIENT_6.id
};
  
export const SEED_RECIPE_INGREDIENT_7: RecipeIngredient = {
    recipeId: SEED_RECIPE_2.id,
    ingredientId: SEED_INGREDIENT_4.id
};

export const SEED_RECIPE_INGREDIENT_8: RecipeIngredient = {
    recipeId: SEED_RECIPE_2.id,
    ingredientId: SEED_INGREDIENT_5.id
};

export const SEED_RECIPE_INGREDIENT_9: RecipeIngredient = {
    recipeId: SEED_RECIPE_2.id,
    ingredientId: SEED_INGREDIENT_2.id
};

export const SEED_RECIPE_INGREDIENT_10: RecipeIngredient = {
    recipeId: SEED_RECIPE_2.id,
    ingredientId: SEED_INGREDIENT_1.id
};

export const SEED_RECIPE_INGREDIENT_11: RecipeIngredient = {
    recipeId: SEED_RECIPE_2.id,
    ingredientId: SEED_INGREDIENT_6.id
};

export const SEED_RECIPE_INGREDIENT_12: RecipeIngredient = {
    recipeId: SEED_RECIPE_3.id,
    ingredientId: SEED_INGREDIENT_4.id
};

export const SEED_RECIPE_INGREDIENT_13: RecipeIngredient = {
    recipeId: SEED_RECIPE_3.id,
    ingredientId: SEED_INGREDIENT_10.id
};

export const SEED_RECIPE_INGREDIENT_14: RecipeIngredient = {
    recipeId: SEED_RECIPE_3.id,
    ingredientId: SEED_INGREDIENT_9.id
};

// create some dummy likes
export const SEED_LIKE_1: Like = {
    id: crypto.randomUUID(),
    userId: SEED_USER.id,
    recipeId: SEED_RECIPE_2.id
};

export const SEED_LIKE_2: Like = {
    id: crypto.randomUUID(),
    userId: SEED_USER.id,
    recipeId: SEED_RECIPE_3.id
};

export const SEED_LIKE_3: Like = {
    id: crypto.randomUUID(),
    userId: SEED_USER_2.id,
    recipeId: SEED_RECIPE_1.id
};

export const SEED_LIKE_4: Like = {
    id: crypto.randomUUID(),
    userId: SEED_USER_3.id,
    recipeId: SEED_RECIPE_1.id
};

// create some dummy comments
export const SEED_COMMENT_1: Comment = {
    id: crypto.randomUUID(),
    userId: SEED_USER.id,
    recipeId: SEED_RECIPE_2.id,
    comment:
        "These cookies are amazing! I added some walnuts for extra crunch.",
    postedAt: Date.now()
};

export const SEED_COMMENT_2: Comment = {
    id: crypto.randomUUID(),
    userId: SEED_USER.id,
    recipeId: SEED_RECIPE_3.id,
    comment:
      "This bread is so easy and delicious. I love the garlic flavor.",
    postedAt: Date.now()
};
  
export const SEED_COMMENT_3: Comment = {
    id: crypto.randomUUID(),
    userId: SEED_USER_2.id,
    recipeId: SEED_RECIPE_1.id,
    comment:
        "This banana bread is moist and yummy. I used brown sugar instead of white sugar and it turned out great.",
    postedAt: Date.now()
};

export const SEED_COMMENT_4: Comment = {
    id: crypto.randomUUID(),
    userId: SEED_USER_3.id,
    recipeId: SEED_RECIPE_1.id,
    comment:
        "I made this banana bread for my kids and they loved it. I added some cinnamon and nutmeg for extra flavor.",
    postedAt: Date.now()
};


// create some dummy groups
export const SEED_GROUP_1: Group = {
    id: crypto.randomUUID(),
    groupName: "Baking Lovers",
    groupCreatorId: SEED_USER.id,
    isPrivate: false,
    groupPass: "",
    createTime: Date.now()
};

export const SEED_Group_2_PASSWORD = "SeedGroupPassword2";
export const SEED_GROUP_2: Group = {
    id: crypto.randomUUID(),
    groupName: "Healthy Recipes",
    groupCreatorId: SEED_USER_2.id,
    isPrivate: true,
    groupPass: "",
    createTime: Date.now()
};

export const SEED_GROUP_3: Group = {
    id: crypto.randomUUID(),
    groupName: "Mira Recipes",
    groupCreatorId: SEED_USER_3.id,
    isPrivate: false, 
    groupPass: "",
    createTime: Date.now()
};

// create some dummy join groups
export const SEED_JOIN_GROUP_1: JoinGroup = {
    userId: SEED_USER.id,
    groupId: SEED_GROUP_1.id
};

export const SEED_JOIN_GROUP_2: JoinGroup = {
    userId: SEED_USER.id,
    groupId: SEED_GROUP_2.id
};

export const SEED_JOIN_GROUP_3: JoinGroup = {
    userId: SEED_USER_2.id,
    groupId: SEED_GROUP_1.id
};

export const SEED_JOIN_GROUP_4: JoinGroup = {
    userId: SEED_USER_2.id,
    groupId: SEED_GROUP_2.id
};

export const SEED_JOIN_GROUP_5: JoinGroup = {
    userId: SEED_USER_3.id,
    groupId: SEED_GROUP_1.id
};  