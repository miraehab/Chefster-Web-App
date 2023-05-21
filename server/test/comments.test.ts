import supertest from "supertest";
import crypto from 'crypto'

import { getAuthToken, getTestServer } from "./testUtils";
import { SEED_COMMENT_1, SEED_COMMENT_3, SEED_COMMENT_4, SEED_RECIPE_1, SEED_RECIPE_2, SEED_USER, SEED_USER_PASSWORD } from "../datastore/sql/seed";
import { request } from "express";
import { db } from "../datastore";

describe("Comments tests", () => {
  let client: supertest.SuperTest<supertest.Test>;
  let userAuthHeader = {};

  beforeAll(async () => {
    client = await getTestServer();

    userAuthHeader = await getAuthToken(
      "/v1/signin",
      SEED_USER.email,
      SEED_USER_PASSWORD
    );
  });

  it('should list all comments for a given recipe id -- /v1/recipes/:recipeId/comments returns 200', async () => {
    // Arrange
    const expectedComments = [SEED_COMMENT_3, SEED_COMMENT_4];

    // Act
    const result = await client.get(`/v1/recipes/${SEED_RECIPE_1.id}/comments`).set(userAuthHeader).expect(200);

    // Assert
    expect(result.body.comments).toEqual(expectedComments);
  });

  // test case for listing all comments with invalid recipe id
  it('should return 404 status code if recipe id is not found', async () => {
    // make a mock request to the endpoint with the user token
    const response = await client.get(`/v1/recipes/${crypto.randomUUID()}/comments`).set(userAuthHeader)

    // check the status code and the response body
    expect(response.status).toBe(404)
    expect(response.body).toEqual({error: "You Should get comments of an existed recipe!"})
  });

  it('should delete a comment and return 200 status', async () => {
    // Act
    const response = await client.delete(`/v1/recipes/${SEED_RECIPE_2.id}/comments/${SEED_COMMENT_1.id}`).set(userAuthHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(await db.getCommentById(SEED_COMMENT_1.id)).toBeUndefined();
  });
});