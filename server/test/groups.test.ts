import supertest from "supertest";
import crypto from 'crypto'

import { getAuthToken, getTestServer } from "./testUtils";
import { SEED_COMMENT_1, SEED_COMMENT_2, SEED_COMMENT_3, SEED_COMMENT_4, SEED_GROUP_1, SEED_GROUP_2, SEED_GROUP_3, SEED_RECIPE_1, SEED_RECIPE_2, SEED_RECIPE_3, SEED_USER, SEED_USER_2, SEED_USER_PASSWORD } from "../datastore/sql/seed";
import { request } from "express";
import { db } from "../datastore";

describe("Groups tests", () => {
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

  // create a test for listing all groups
  it("GET /v1/groups", async () => {
    // make a get request to the endpoint
    const response = await client.get("/v1/groups").set(userAuthHeader);

    // expect the response status to be 200 (ok)
    expect(response.status).toBe(200);

    // expect the response body to be an array of groups
    expect(Array.isArray(response.body.groups)).toBe(true);

    // expect the response body to have two groups
    expect(response.body.groups.length).toBe(2);
  });

  // create a test for creating a group with an empty group name
  it("POST /v1/groups with empty group name", async () => {
    // create a mock request body with a valid user id and an empty group name
    const requestBody = {
     userId: SEED_USER.id,
     groupName: ""
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/groups").set(userAuthHeader).send(requestBody);

    // expect the response status to be 400 (bad request)
    expect(response.status).toBe(400);

    // expect the response body to have an error message
    expect(response.body).toHaveProperty("error");
  });

  it("POST /v1/groups with isPrtivate is true and password", async () => {
    // create a mock request body with a valid user id and group name
    const requestBody = {
      groupName: "Test Group",
      isPrivate: true,
      groupPass: "pass1"
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/groups").set(userAuthHeader).send(requestBody);

    // expect the response status to be 201 (created)
    expect(response.status).toBe(201);
  });

  it("POST /v1/groups with empty groupName", async () => {
    // create a mock request body with a valid user id and group name
    const requestBody = {
      groupName: "",
      isPrivate: false
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/groups").set(userAuthHeader).send(requestBody);

    // expect the response status to be 400 (Bad request)
    expect(response.status).toBe(400);

    // expect the response body to have an error message
    expect(response.body).toHaveProperty("error");
  });

  it("POST /v1/groups with isPrivate is true and no password", async () => {
    // create a mock request body with a valid user id and group name
    const requestBody = {
      groupName: "Test Group",
      isPrivate: true
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/groups").set(userAuthHeader).send(requestBody);

    // expect the response status to be 400 (Bad request)
    expect(response.status).toBe(400);

    // expect the response body to have an error message
    expect(response.body).toHaveProperty("error");
  });

  it("POST /v1/groups with isPrivate is true and password empty", async () => {
    // create a mock request body with a valid user id and group name
    const requestBody = {
      groupName: "Test Group",
      isPrivate: true,
      groupPass: ""
    };

    // make a post request to the endpoint with the request body
    const response = await client.post("/v1/groups").set(userAuthHeader).send(requestBody);

    // expect the response status to be 400 (Bad request)
    expect(response.status).toBe(400);

    // expect the response body to have an error message
    expect(response.body).toHaveProperty("error");
  });

  // create a test for listing all groups that a user has joined
  it("GET /v1/users/membership", async () => {
    // make a get request to the endpoint with a valid user id as query parameter
    const response = await client.get("/v1/users/membership").set(userAuthHeader);

    // expect the response status to be 200 (ok)
    expect(response.status).toBe(200);

    // expect the response body to be an array of groups
    expect(Array.isArray(response.body.userGroups)).toBe(true);
  });
  
  // create a test for listing all groups that a user has joined with an invalid user id
  it("GET /v1/users/membership with invalid user id", async () => {
    // make a get request to the endpoint with an invalid user id as query parameter
    const response = await client.get("/v1/users/membership");

    // expect the response status to be 404 (not found)
    expect(response.status).toBe(401);
  });
});