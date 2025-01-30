import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a Pet", async () => {
    const { token, id } = await createAndAuthenticateOrg(app);

    const responseCreatePet = await request(app.server)
      .post(`/pets`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Dog",
        about: "About Dog",
        age: "1",
        energy_level: "1",
        environment: "1",
        size: "1",
        org_id: id,
      });

    expect(responseCreatePet.status).toBe(201);
  });
});
