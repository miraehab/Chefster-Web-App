import supertest from "supertest";
import crypto from 'crypto'

import { getAuthToken, getTestServer } from "./testUtils";
import { SEED_COMMENT_1, SEED_COMMENT_2, SEED_COMMENT_3, SEED_COMMENT_4, SEED_RECIPE_1, SEED_RECIPE_2, SEED_RECIPE_3, SEED_USER, SEED_USER_2, SEED_USER_PASSWORD } from "../datastore/sql/seed";
import { request } from "express";
import { db } from "../datastore";

describe("Recipes tests", () => {
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

  // create a test for listing all recipes
  it("GET /v1/recipes", async () => {
    // make a get request to the endpoint
    const response = await client.get("/v1/recipes").set(userAuthHeader);

    // expect the response status to be 200 (ok)
    expect(response.status).toBe(200);

    // expect the response body to be an array of recipes
    expect(Array.isArray(response.body.recipes)).toBe(true);

    // expect the response body to have three recipes
    expect(response.body.recipes.length).toBe(3);
  });

   // create a test for creating a recipe
   it("POST /v1/recipes", async () => {
    // create a mock request body with a valid recipe
    const requestBody = {
      title: "Test Recipe",
      instructions: "This is a test recipe.",
      cuisine: "Test Cuisine",
      ingredients: ["i1", "i2"]
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/recipes").set(userAuthHeader).send(requestBody);

    // expect the response status to be 201 (created)
    expect(response.status).toBe(201);
  });

  // create a test for creating a recipe with an empty title
  it("POST /v1/recipes with empty title", async () => {
    // create a mock request body with an empty title
    const requestBody = {
     title: "",
     instructions: "This is a test recipe.",
     cuisine: "Test Cuisine",
     ingredients: ["i1", "i2"]
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/recipes").set(userAuthHeader).send(requestBody);

    // expect the response status to be 400 (bad request)
    expect(response.status).toBe(400);

    // expect the response body to have an error message
    expect(response.body).toHaveProperty("error");
  });

  it("POST /v1/recipes with invalid user id", async () => {
    // create a mock request body with a valid recipe but an invalid user id
    const requestBody = {
     title: "Test Recipe",
     instructions: "This is a test recipe.",
     cuisine: "Test Cuisine",
     ingredients: ["i1", "i2"]
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/recipes").send(requestBody);

    // expect the response status to be 401 
    expect(response.status).toBe(401);
  });
});