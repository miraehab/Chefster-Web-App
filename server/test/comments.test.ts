import supertest from "supertest";
import crypto from 'crypto'

import { getAuthToken, getTestServer } from "./testUtils";
import { SEED_COMMENT_1, SEED_COMMENT_2, SEED_COMMENT_3, SEED_COMMENT_4, SEED_RECIPE_1, SEED_RECIPE_2, SEED_RECIPE_3, SEED_USER, SEED_USER_2, SEED_USER_PASSWORD } from "../datastore/sql/seed";
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

  // test case for listing all comments
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

  // test case for deleting a comment
  it('should delete a comment and return 200 status', async () => {
    // Act
    const response = await client.delete(`/v1/recipes/${SEED_RECIPE_2.id}/comments/${SEED_COMMENT_1.id}`).set(userAuthHeader);

    // Assert
    expect(response.status).toBe(200);
    expect(await db.getCommentById(SEED_COMMENT_1.id)).toBeUndefined();
  });

  // create a test for creating a comment
  it("POST /v1/recipes/:recipeId/comments", async () => {
    // create a mock request body with a valid comment
    const requestBody = {
      userId: SEED_USER.id,
      recipeId: SEED_RECIPE_1.id,
      comment: "This is a test comment."
    };

    // make a post request to the endpoint with the request body
    const response = await client.post(`/v1/recipes/${SEED_RECIPE_1.id}/comments`).set(userAuthHeader).send(requestBody);

    // expect the response status to be 201 (created)
    expect(response.status).toBe(201);
  });

  // create a test for creating a comment with an invalid recipe id
  test("POST /v1/recipes/:recipeId/comments with invalid recipe id", async () => {
    // create a mock request body with a valid comment
    const requestBody = {
      userId: SEED_USER.id,
      recipeId: "invalid-id",
      comment: "This is a test comment."
    };

    // make a post request to the endpoint with the request body
    const response = await client.post(`/v1/recipes/${requestBody.recipeId}/comments`).set(userAuthHeader).send(requestBody);

    // expect the response status to be 404 (not found)
    expect(response.status).toBe(404);

    // expect the response body to have an error message
    expect(response.body).toHaveProperty("error");
  });

  // create a test for creating a comment with an empty comment
  test("POST /v1/recipes/:recipeId/comments with empty comment", async () => {
    // create a mock request body with an empty comment
    const requestBody = {
      userId: SEED_USER.id,
      recipeId: SEED_RECIPE_1.id,
      comment: ""
    };

    // make a post request to the endpoint with the request body
    const response = await client.post(`/v1/recipes/${requestBody.recipeId}/comments`).set(userAuthHeader).send(requestBody);

    // expect the response status to be 400 (bad request)
    expect(response.status).toBe(400);

    // expect the response body to have an error message
    expect(response.body).toHaveProperty("error");
  });

  // create a test for deleting a comment by another user who is not its creator or admin
  test("DELETE /v1/recipes/:recipeId/comments/:commentId by another user", async () => {
    // make a delete request to the endpoint with a valid recipe id and comment id and user id as query parameter
    const response = await client.delete(`/v1/recipes/${SEED_RECIPE_1.id}/comments/${SEED_COMMENT_3.id}`).set(userAuthHeader);

    // expect the response status to be 403 (forbidden)
    expect(response.status).toBe(403);

    // expect the response body to have an error message
    expect(response.body).toHaveProperty("error");
  });
});