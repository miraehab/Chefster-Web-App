import superset from "supertest";

import { createServer } from "../server";

let client: superset.SuperTest<superset.Test>;

export async function getTestServer() {
  if (!client) {
    const server = await createServer(":memory:", false);
    client = superset(server);
  }

  return client;
}

// Url can be:
// /v1/signin
export const getAuthToken = async (
  path: string,
  login: string,
  password: string
) => {
  const result = await client.post(path).send({ login, password }).expect(200);
  return { Authorization: "Bearer " + result.body.jwt };
};