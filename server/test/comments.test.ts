import supertest from "supertest";

import { getTestServer } from "./testUtils";

describe("Comments tests", () => {
  let client: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    client = await getTestServer();
  });

  it("Server is up and running -- /recipes returns 200", async () => {
    const result = await client.get("/recipes").expect(200);
    expect(result.body).toStrictEqual({ status: "OK" });
  });
});