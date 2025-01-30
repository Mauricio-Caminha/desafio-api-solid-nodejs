import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";

describe("Fetch nearby Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch a nearby orgs within 10 km", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    await request(app.server).post(`/orgs`).send({
      name: "Dog Orgs",
      author_name: "Mauri",
      email: "org2@email.com",
      whatsapp: "123456789",
      password: "123456",
      cep: "88888888",
      city: "City",
      state: "State",
      neighborhood: "Neighborhood",
      street: "Street",
      latitude: 0,
      longitude: 0,
    });

    const responseFetchNearbyOrgs = await request(app.server)
      .get("/orgs/nearby")
      .set("Authorization", `Bearer ${token}`)
      .query({ latitude: 0, longitude: 0 });

    expect(responseFetchNearbyOrgs.status).toBe(200);
    expect(responseFetchNearbyOrgs.body.orgs).toHaveLength(2);
  });
});
