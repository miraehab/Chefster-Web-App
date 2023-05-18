CREATE TABLE [User](
    id VARCHAR PRIMARY KEY,
    firstName VARCHAR NOT NULL,
    lastName VARCHAR NOT NULL,
    userName VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
);

CREATE TABLE Recipe(
    id VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL,
    instruction VARCHAR NOT NULL,
    cusine VARCHAR NOT NULL,
    userId VARCHAR NOT NULL,
    postedAt INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES [User](id)
);

CREATE TABLE Ingredient(
    id VARCHAR PRIMARY KEY,
    ingrdient VARCHAR NOT NULL,
);

CREATE TABLE RecipeIngredient(
    recipeId VARCHAR PRIMARY KEY,
    ingrdientId VARCHAR PRIMARY KEY,
    FOREIGN KEY (recipeId) REFERENCES Recipe(id),
    FOREIGN KEY (ingrdientId) REFERENCES Ingredient(id)
);

CREATE TABLE [Like](
    userId VARCHAR PRIMARY KEY,
    recipeId VARCHAR PRIMARY KEY,
    FOREIGN KEY (recipeId) REFERENCES Recipe(id),
    FOREIGN KEY (userId) REFERENCES [User](id)
);

CREATE TABLE Comment(
    id VARCHAR PRIMARY KEY,
    userId VARCHAR NOT NULL,
    recipeId VARCHAR NOT NULL,
    comment VARCHAR NOT NULL,
    postedAt INTEGER NOT NULL,
    FOREIGN KEY (recipeId) REFERENCES Recipe(id),
    FOREIGN KEY (userId) REFERENCES [User](id)
);

CREATE TABLE [Group](
    id VARCHAR PRIMARY KEY,
    groupName VARCHAR NOT NULL,
    groupCreatorID VARCHAR NOT NULL,
    isPrivate BOOLEAN NOT NULL,
    FOREIGN KEY (groupCreatorID) REFERENCES [User](id)
);

CREATE TABLE JoinGroup(
    userId VARCHAR PRIMARY KEY,
    groupId VARCHAR PRIMARY KEY,
    FOREIGN KEY (userId) REFERENCES [User](id),
    FOREIGN KEY (groupId) REFERENCES [Group](id)
);