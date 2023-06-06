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

  // create a test for listing all groups that a user has joined
  it("GET /v1/userJoinedGroups", async () => {
    // make a get request to the endpoint with a valid user id as query parameter
    const response = await client.get("/v1/userJoinedGroups").set(userAuthHeader);

    // expect the response status to be 200 (ok)
    expect(response.status).toBe(200);

    // expect the response body to be an array of groups
    expect(Array.isArray(response.body.userGroups)).toBe(true);

    // expect the response body to have two groups for this user
    expect(response.body.userGroups.length).toBe(2);
  });
  
  // create a test for listing all groups that a user has joined with an invalid user id
  test("GET /v1/userJoinedGroups with invalid user id", async () => {
    // make a get request to the endpoint with an invalid user id as query parameter
    const response = await client.get("/v1/userJoinedGroups");

    // expect the response status to be 404 (not found)
    expect(response.status).toBe(401);
  });
});