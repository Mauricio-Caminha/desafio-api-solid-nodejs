import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { prisma } from "@/lib/prisma";
import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";

describe("Get Pet Details (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get details of a Pet", async () => {
    const { id } = await createAndAuthenticateOrg(app);

    const pet = await prisma.pet.create({
      data: {
        name: "Dog",
        about: "About Dog",
        age: "1",
        energy_level: "1",
        environment: "1",
        size: "1",
        org_id: id,
      },
    });

    const response = await request(app.server).get(`/pets/${pet.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: pet.id,
        name: pet.name,
        about: pet.about,
        age: pet.age,
        energy_level: pet.energy_level,
        environment: pet.environment,
        size: pet.age,
        org_id: id,
      })
    );
  });
});
