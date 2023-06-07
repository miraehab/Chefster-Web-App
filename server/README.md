<h1>API Documentation:</h1>

# Users

## Sign Up

Creates a new user account with the given information and returns a JSON Web Token (JWT) for authentication.

+ URL

  /v1/signup

+ Method

  `POST`

+ URL Params

  None

+ Data Params

  + Required:

    ```json
    {
      "firstName": [string],
      "lastName": [string],
      "username": [string],
      "password": [string],
      "email": [string]
    }
    ```

+ Success Response

  + Code: 201 - Created
  + Content:

    ```json
    {
      "jwt": [string]
    }
    ```

+ Error Response

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "All fields are required"
    }
    ```

  OR

  + Code: 403 - Forbidden
  + Content:

    ```json
    {
      "error": "User already exists"
    }
    ```

## Sign In

Authenticates a user with the given login and password and returns a JSON Web Token (JWT) and the user information.

+ URL

  /v1/signin

+ Method

  `POST`

+ URL Params

  None

+ Data Params

  + Required:

    ```json
    {
      "login": [string],
      "password": [string]
    }
    ```

+ Success Response

  + Code: 200 - OK
  + Content:

    ```json
    {
      "user": {
        "firstName": [string],
        "lastName": [string],
        "username": [string],
        "email": [string],
        "id": [string]
      },
      "jwt": [string]
    }
    ```

+ Error Response

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "Invalid or missing parameters"
    }
    ```

  OR

  + Code: 403 - Forbidden
  + Content:

    ```json
    {
      "error": "Invalid credentials"
    }
    ```

## List All Recipes

Returns a list of all recipes in the database.

+ URL

  /v1/recipes

+ Method

  `GET`

+ URL Params

  None

+ Data Params

  None

+ Success Response

  + Code: 200 - OK
  + Content:

    ```json
    {
      "recipes": [
        {
          "id": [string],
          "title": [string],
          "instruction": [string],
          "cuisine": [string],
          "userId": [string],
          "postedAt": [number]
        },
        ...
      ]
    }
    ```

+ Error Response

  None

## Create Recipe

Creates a new recipe with the given information and adds it to the database.

+ URL

  /v1/recipes

+ Method

  `POST`

+ URL Params

  None

+ Data Params

  + Required:

    ```json
    {
      "title": [string],
      "instructions": [string],
      "cuisine": [string],
      "ingredients": [array of strings]
    }
    ```

+ Success Response

  + Code: 201 - Created
  + Content:

    None

+ Error Response

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "All fields are required"
    }
    ```

  OR

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "All ingredients are required"
    }
    ```

## Get Recipe

Returns a recipe with the given id from the database.

+ URL

  /v1/recipes/:id

+ Method

  `GET`

+ URL Params

  + Required:

    `id=[string]`

+ Data Params

  None

+ Success Response

  + Code: 200 - OK
  + Content:

    ```json
    {
      "recipe": {
        "id": [string],
        "title": [string],
        "instruction": [string],
        "cuisine": [string],
        "userId": [string],
        "postedAt": [number]
      }
    }
    ```

+ Error Response

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "Recipe not found"
    }
    ```

## Delete Recipe

Deletes a recipe with the given id from the database. Only the user who created the recipe can delete it.

+ URL

  /v1/recipes/:id

+ Method

  `DELETE`

+ URL Params

  + Required:

    `id=[string]`

+ Data Params

  None

+ Success Response

  + Code: 200 - OK
  + Content:

    None

+ Error Response

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "You should delete an existing recipe"
    }
    ```

  OR

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "You should delete your own recipe"
    }
    ```

## Create Comment

Creates a new comment with the given text and adds it to the database. The comment is associated with a recipe and a user.

+ URL

  /v1/recipes/:recipeId/comments

+ Method

  `POST`

+ URL Params

  + Required:

    `recipeId=[string]`

+ Data Params

  + Required:

    ```json
    {
      "comment": [string]
    }
    ```

+ Success Response

  + Code: 201 - Created
  + Content:

    None

+ Error Response

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "You should write a comment"
    }
    ```

  OR

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "You should comment on a recipe"
    }
    ```

  OR

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "You should comment on an existing recipe"
    }
    ```

## List All Comments

Returns a list of all comments for a given recipe from the database.

+ URL

  /v1/recipes/:recipeId/comments

+ Method

  `GET`

+ URL Params

  + Required:

    `recipeId=[string]`

+ Data Params

  None

+ Success Response

  + Code: 200 - OK
  + Content:

    ```json
    {
      "comments": [
        {
          "id": [string],
          "userId": [string],
          "recipeId": [string],
          "comment": [string],
          "postedAt": [number]
        },
        ...
      ]
    }
    ```

+ Error Response

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "You should get comments of a recipe"
    }
    ```

  OR

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "You should get comments of an existing recipe"
    }
    ```

## Delete Comment

Deletes a comment with the given id from the database. Only the user who created the comment can delete it.

+ URL

  /v1/recipes/:recipeId/comments/:commentId

+ Method

  `DELETE`

+ URL Params

  + Required:

    `recipeId=[string]`
    `commentId=[string]`

+ Data Params

  None

+ Success Response

  + Code: 200 - OK
  + Content:

    None

+ Error Response

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "You should delete a specific comment"
    }
    ```

  OR

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "You should delete an existing comment"
    }
    ```

  OR

  + Code: 401 - Unauthorized
  + Content:

    ```json
    {
      "error": "This comment doesn't exist in this recipe"
    }
    ```

  OR

  + Code: 403 - Forbidden
  + Content:

    ```json
    {
      "error": "You should delete your own comment"
    }
    ```

## Create Like

Creates or deletes (toggle) a like for a given recipe from the database. The like is associated with a recipe and a user.

+ URL

  /v1/recipes/:recipeId/likes

+ Method

  `POST`

+ URL Params

  + Required:

    `recipeId=[string]`

+ Data Params

  None

+ Success Response

  + Code: 200 - OK
  + Content:

    None

+ Error Response

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "You should like on a recipe"
    }
    ```

  OR

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "You should like on an existing recipe"
    }
    ```

## List All Groups

Returns a list of all public groups from the database.

+ URL

  /v1/groups

+ Method

  `GET`

+ URL Params

  None

+ Data Params

  None

+ Success Response

  + Code: 200 - OK
  + Content:

    ```json
    {
      "groups": [
        {
          "id": [string],
          "groupName": [string],
          "groupCreatorId": [string],
          "isPrivate": [number],
          "createTime": [number]
        },
        ...
      ]
    }
    ```

+ Error Response

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "No groups found"
    }
    ```

## Create Group

Creates a new group with the given name and privacy settings and adds it to the database. The group is associated with a user who created it.

+ URL

  /v1/groups

+ Method

  `POST`

+ URL Params

  None

+ Data Params

  + Required:

    ```json
    {
      "groupName": [string],
      "isPrivate": [boolean]
    }
    ```

  + Optional:

    ```json
    {
      "groupPass": [string]
    }
    ```

+ Success Response

  + Code: 201 - Created
  + Content:

    None

+ Error Response

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "GroupName and isPrivate are required"
    }
    ```

  OR

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "Your group is private. It should have a password"
    }
    ```

## List User Created Groups

Returns a list of all groups created by the user from the database.

+ URL

  /v1/users/groups

+ Method

  `GET`

+ URL Params

  None

+ Data Params

  None

+ Success Response

  + Code: 200 - OK
  + Content:

    ```json
    {
      "createdGroups": [
        {
          "id": [string],
          "groupName": [string],
          "groupCreatorId": [string],
          "isPrivate": [number],
          "createTime": [number]
        },
        ...
      ]
    }
    ```

+ Error Response

  + Code: 401 - Unauthorized
  + Content:

    ```json
    {
      "error": "Invalid user"
    }
    ```

  OR

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "Created groups not found"
    }
    ```

## List User Joined Groups

Returns a list of all groups joined by the user from the database.

+ URL

  /v1/users/membership

+ Method

  `GET`

+ URL Params

  None

+ Data Params

  None

+ Success Response

  + Code: 200 - OK
  + Content:

    ```json
    {
      "userGroups": [
        {
          "id": [string],
          "groupName": [string],
          "groupCreatorId": [string],
          "isPrivate": [number],
          "createTime": [number]
        },
        ...
      ]
    }
    ```

+ Error Response

  + Code: 401 - Unauthorized
  + Content:

    ```json
    {
      "error": "Invalid user"
    }
    ```

  OR

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "Groups not found"
    }
    ```

## Delete Group

Deletes a group with the given id from the database. Only the user who created the group can delete it.

+ URL

  /v1/groups/:id

+ Method

  `DELETE`

+ URL Params

  + Required:

    `id=[string]`

+ Data Params

  None

+ Success Response

  + Code: 200 - OK
  + Content:

    None

+ Error Response

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "Invalid request"
    }
    ```

  OR

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "Group not found"
    }
    ```

  OR

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "You should delete your own group"
    }
    ```

## Get Group

Returns a group with the given id from the database. If the group is private, only the members can access it.

+ URL

  /v1/groups/:id

+ Method

  `GET`

+ URL Params

  + Required:

    `id=[string]`

+ Data Params

  None

+ Success Response

  + Code: 200 - OK
  + Content:

    ```json
    {
      "group": {
        "id": [string],
        "groupName": [string],
        "groupCreatorId": [string],
        "isPrivate": [number],
        "createTime": [number]
      }
    }
    ```

+ Error Response

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "Invalid group id"
    }
    ```

  OR

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "Group not found"
    }
    ```

  OR

  + Code: 401 - Unauthorized
  + Content:

    ```json
    {
      "error": "It's a private group and you are not a member"
    }
    ```

## Join Group

Joins a group with the given id or password from the database. If the group is private, a password is required.

+ URL

  /v1/groups/:id

+ Method

  `POST`

+ URL Params

  + Optional:

    `id=[string]`

+ Data Params

  + Optional:

    ```json
    {
      "groupPass": [string]
    }
    ```

+ Success Response

  + Code: 200 - OK
  + Content:

    None

+ Error Response

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "Invalid group id"
    }
    ```

  OR

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "Group not found"
    }
    ```

## List Group Members

Returns a list of all members of a given group from the database.

+ URL

  /v1/groups/:id/members

+ Method

  `GET`

+ URL Params

  + Required:

    `id=[string]`

+ Data Params

  None

+ Success Response

  + Code: 200 - OK
  + Content:

    ```json
    {
      "members": [
        {
          "id": [string],
          "firstName": [string],
          "lastName": [string],
          "username": [string],
          "email": [string]
        },
        ...
      ]
    }
    ```

+ Error Response

  + Code: 400 - Bad Request
  + Content:

    ```json
    {
      "error": "Invalid group id"
    }
    ```

  OR

  + Code: 404 - Not Found
  + Content:

    ```json
    {
      "error": "Members not found"
    }
    ```
