import express, { RequestHandler } from "express";
import { db, initDb } from "./datastore/index"
import { listAllRecipesHandler, createRecipeHandler, getRecipeHandler, deleteRecipeHandler } from "./handlers/recipeHandler"
import { errorHandler } from './middleware/errorHandler'
import asyncHandler from "express-async-handler"
import { signUpHandler, signInHandler, getUserHandler } from "./handlers/userHandler";
import { createCommentHandler, listAllCommentsHandler, deleteCommentHandler } from "./handlers/commentHandler";
import dotenv from 'dotenv'
import { authMiddleware } from "./middleware/authMiddleware";
import { createLikeHandler } from "./handlers/likeHandler";
import http from "http";
import { createGroupHandler, deleteGroupHandler, getGroupHandler, joinGroupHandler, listAllGroupsHandler, listGroupMembers, listUserCreatedGroupsHandler, listUserJoinedGroupsHandler } from "./handlers/groupHandler";

export const createServer = async (dbPath: string, logRequests: boolean) => {
  // To ensure that the database initiated correctly
  // Because without database our app couldn't run
  //await initDb(path.join(__dirname, "datastore", "sql", "chefsterdb.sqlite"));
  dotenv.config();
  await initDb(":memory:");

  const app = express();

  app.use(express.json());

  // Public Endpoints
  app.post('/v1/signup', asyncHandler(signUpHandler));
  app.post('/v1/signin', asyncHandler(signInHandler));

  // Any action after sign up needs authentication
  app.use(authMiddleware);

  // Protected Endpoints
  app.get('/v1/users/:id', asyncHandler(getUserHandler))
  
  app.get('/v1/recipes', asyncHandler(listAllRecipesHandler));
  app.post('/v1/recipes', asyncHandler(createRecipeHandler));
  app.get('/v1/recipes/:id', asyncHandler(getRecipeHandler));
  app.delete('/v1/recipes/:id', asyncHandler(deleteRecipeHandler));

  app.post('/v1/recipes/:recipeId/comments', asyncHandler(createCommentHandler))
  app.get('/v1/recipes/:recipeId/comments', asyncHandler(listAllCommentsHandler))
  app.delete('/v1/recipes/:recipeId/comments/:commentId', asyncHandler(deleteCommentHandler))

  app.post('/v1/recipes/:recipeId/Likes', asyncHandler(createLikeHandler))

  app.get('/v1/groups', asyncHandler(listAllGroupsHandler));
  app.post('/v1/groups', asyncHandler(createGroupHandler));
  app.get('/v1/users/groups', asyncHandler(listUserCreatedGroupsHandler));
  app.get('/v1/users/membership', asyncHandler(listUserJoinedGroupsHandler));
  app.delete('/v1/groups/:id', asyncHandler(deleteGroupHandler))
  app.get('/v1/groups/:id', asyncHandler(getGroupHandler))
  app.post('/v1/groups/:id', asyncHandler(joinGroupHandler))
  app.get('/v1/groups/:id/members', asyncHandler(listGroupMembers))

  app.use(errorHandler);

  return http.createServer(app);
};