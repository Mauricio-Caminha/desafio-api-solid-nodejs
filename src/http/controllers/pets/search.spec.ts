import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { prisma } from "@/lib/prisma";
import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

const prismaPetsRepository = new PrismaPetsRepository();

describe("Search Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();

    const { id } = await createAndAuthenticateOrg(app);

    prismaPetsRepository.create({
      name: "Dog",
      about: "About Dog",
      age: "12",
      energy_level: "high",
      environment: "1",
      size: "medium",
      org_id: id,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it("should not be able to search Pets without a City", async () => {
    const response = await request(app.server).get(`/pets`);
    expect(response.status).toBe(400);
  });

  it("should be able to search Pets by City", async () => {
    const response = await request(app.server).get(`/pets`).query({
      city: "City",
    });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search Pets by City and Age", async () => {
    const response = await request(app.server).get(`/pets`).query({
      city: "City",
      age: "12",
    });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search Pets by City and Size", async () => {
    const response = await request(app.server).get(`/pets`).query({
      city: "City",
      size: "medium",
    });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search Pets by City and Energy Level", async () => {
    const response = await request(app.server).get(`/pets`).query({
      city: "City",
      energy_level: "high",
    });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search Pets by City and Environmet", async () => {
    const response = await request(app.server).get(`/pets`).query({
      city: "City",
      environmet: "1",
    });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });
});
