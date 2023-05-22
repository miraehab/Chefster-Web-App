import supertest from "supertest";
import crypto from 'crypto'

import { getAuthToken, getTestServer } from "./testUtils";
import { SEED_COMMENT_1, SEED_COMMENT_2, SEED_COMMENT_3, SEED_COMMENT_4, SEED_RECIPE_1, SEED_RECIPE_2, SEED_RECIPE_3, SEED_USER, SEED_USER_2, SEED_USER_PASSWORD } from "../datastore/sql/seed";
import { request } from "express";
import { db } from "../datastore";

describe("Likes tests", () => {
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

  // create a test for creating a like
  it("POST /v1/recipes/:recipeId/likes", async () => {
    // create a mock request body with a valid user id and recipe id
    const requestBody = {
      userId: SEED_USER.id,
      recipeId: SEED_RECIPE_1.id
    };

    // make a post request to the endpoint with the request body
    const response = await client.post(`/v1/recipes/${requestBody.recipeId}/likes`).set(userAuthHeader);

    // expect the response status to be 200
    expect(response.status).toBe(200);

    expect(await db.getLike(requestBody.recipeId, requestBody.userId)).toBeDefined();
  });

  // create a test for delete a like
  it("POST /v1/recipes/:recipeId/likes", async () => {
    // make a post request to the endpoint with the request body
    const response = await client.post(`/v1/recipes/${SEED_RECIPE_3.id}/likes`).set(userAuthHeader);

    // expect the response status to be 200
    expect(response.status).toBe(200);

    expect(await db.getLike(SEED_RECIPE_3.id, SEED_USER.id)).toBeUndefined();
  });

  it("POST /v1/recipes/:recipeId/likes with invalid recipe id", async () => {
    // create a mock request body with a valid user id and an invalid recipe id
    const requestBody = {
     userId: SEED_USER.id,
     recipeId: "invalid-id"
    };

    // make a post request to the endpoint with the request body
    const response = await client.post(`/v1/recipes/${requestBody.recipeId}/likes`).set(userAuthHeader);

    // expect the response status to be 404 (not found)
    expect(response.status).toBe(404);

    // expect the response body to have an error message
    expect(response.body).toHaveProperty("error");
  });

  // create a test for creating a like with an invalid user id
  it("POST /v1/recipes/:recipeId/likes with invalid user id", async () => {

    // make a post request to the endpoint with the request body
    const response = await client.post(`/v1/recipes/${SEED_RECIPE_1.id}/likes`);

    // expect the response status to be 404 (not found)
    expect(response.status).toBe(401);
  });
});