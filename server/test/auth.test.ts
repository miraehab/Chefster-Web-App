import supertest from "supertest";
import crypto from 'crypto'

import { getAuthToken, getTestServer } from "./testUtils";
import { SEED_COMMENT_1, SEED_COMMENT_2, SEED_COMMENT_3, SEED_COMMENT_4, SEED_RECIPE_1, SEED_RECIPE_2, SEED_RECIPE_3, SEED_USER, SEED_USER_2, SEED_USER_PASSWORD } from "../datastore/sql/seed";
import { request } from "express";
import { db } from "../datastore";

describe("SignIn tests", () => {
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

  // create a test for signing up a new user
  it("POST /v1/signup", async () => {
    // create a mock request body with a valid user
    const requestBody = {
      firstName: "Test",
      lastName: "User",
      username: "testuser",
      password: "testpassword",
      email: "test@test.com"
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/signup").send(requestBody);

    // expect the response status to be 201 (created)
    expect(response.status).toBe(201);

    // expect the response body to have an id property
    expect(response.body).toHaveProperty("jwt");
  });

  // create a test for signing up a new user with an existing username
  test("POST /v1/signup with existing username", async () => {
    // create a mock request body with a valid user but an existing username
    const requestBody = {
     firstName: "Test",
     lastName: "User",
     username: SEED_USER.username,
     password: "testpassword",
     email: "test@test.com"
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/signup").send(requestBody);

    // expect the response status to be 403
    expect(response.status).toBe(403);

    // expect the response body to have an error message
    expect(response.body).toHaveProperty("error");
  });

  // create a test for signing up a new user with an existing email
  test("POST /v1/signup with existing email", async () => {
    // create a mock request body with a valid user but an existing email
    const requestBody = {
     firstName: "Test",
     lastName: "User",
     username: "testuser",
     password: "testpassword",
     email: SEED_USER.email
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/signup").send(requestBody);

    // expect the response status to be 403
    expect(response.status).toBe(403);

    // expect the response body to have an error message
    expect(response.body).toHaveProperty("error");
  });
  
  // create a test for signing in with a valid username and password
  test("POST /v1/signin with valid username and password", async () => {
    // create a mock request body with a valid username and password
    const requestBody = {
      login: SEED_USER.username,
      password: SEED_USER_PASSWORD
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/signin").send(requestBody);

    // expect the response status to be 200 (ok)
    expect(response.status).toBe(200);

    // expect the response body to have a token property
    expect(response.body).toHaveProperty("jwt");
  });

  // create a test for signing in with an invalid username
  test("POST /v1/signin with invalid username", async () => {
    // create a mock request body with an invalid username and a valid password
    const requestBody = {
     login: "invalid-username",
     password: SEED_USER_PASSWORD
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/signin").send(requestBody);

    // expect the response status to be 403
    expect(response.status).toBe(403);

    // expect the response body to have an error message
    expect(response.body).toHaveProperty("error");
  });

  it("POST /v1/signin with invalid password", async () => {
    // create a mock request body with a valid username and an invalid password
    const requestBody = {
     login: SEED_USER.username,
     password: "invalid-password"
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/signin").send(requestBody);

    // expect the response status to be 403
    expect(response.status).toBe(403);

    // expect the response body to have an error message
    expect(response.body).toHaveProperty("error");
  });
});