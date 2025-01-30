import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

describe("Refresh Token (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to refresh a token", async () => {
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

    const authResponse = await request(app.server).post("/sessions").send({
      email: "org@email.com",
      password: "123456",
    });

    const cookies = authResponse.get("Set-Cookie");

    if (!cookies) {
      throw new Error("No cookies found in the response");
    }

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });

    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
