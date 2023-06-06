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
    expect(Array.isArray(response.body)).toBe(true);

    // expect the response body to have two groups
    expect(response.body.length).toBe(2);

    // expect the response body to have the same properties as the seed groups
    expect(response.body[0]).toEqual(expect.objectContaining(SEED_GROUP_1));
    expect(response.body[1]).toEqual(expect.objectContaining(SEED_GROUP_3));
  });
  
});