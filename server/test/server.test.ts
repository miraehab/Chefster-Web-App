import supertest from "supertest";

import { getAuthToken, getTestServer } from "./testUtils";
import { SEED_USER, SEED_USER_PASSWORD } from "../datastore/sql/seed";

describe("Server tests", () => {
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

  it("Server is up and running -- /recipes returns 200", async () => {
    const result = await client.get("/v1/recipes").set(userAuthHeader).expect(200);
  });
});