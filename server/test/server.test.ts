import supertest from "supertest";
import superset from "supertest";
import dotenv from "dotenv";
import { db } from "../datastore";
import { createServer } from "../server";

let singleClient: superset.SuperTest<superset.Test>;

describe("Server tests", () => {
  let client: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    if (!singleClient) {
      const server = await createServer(":memory:", false);
      client = superset(server);
    }
  });

  it("Server is up and running -- /recipes returns 200", async () => {
    const result = await client.get("/recipes").expect(200);
    expect(result.body).toStrictEqual({ status: "OK" });
  });
});