import request from "supertest";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate an org", async () => {
    await request(app.server).post(`/orgs`).send({
      name: "Pets Orgs",
      author_name: "Mauri",
      email: "org@email.com",
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

    const response = await request(app.server).post("/sessions").send({
      email: "org@email.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
