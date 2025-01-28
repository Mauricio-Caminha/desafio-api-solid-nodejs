import { expect, it, describe, beforeEach } from "vitest";
import { compare } from "bcryptjs";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { CreateOrgUseCase } from "@/use-cases/create-org";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

let inMemoryOrgsRepository: InMemoryOrgsRepository;
let createOrgUseCase: CreateOrgUseCase;

describe("Create Org Use Case", () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    createOrgUseCase = new CreateOrgUseCase(inMemoryOrgsRepository);
  });

  it("should be able to create a new ORG", async () => {
    const { org } = await createOrgUseCase.execute({
      name: "Pets Orgs",
      author_name: "Mauri",
      email: "org@email.com",
      whatsapp: "123456788",
      password: "123456",
      cep: "88888888",
      city: "City",
      state: "State",
      neighborhood: "Neighborhood",
      street: "Street",
      latitude: 0,
      longitude: 0,
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should hash the password upon registration", async () => {
    const { org } = await createOrgUseCase.execute({
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

    const isPasswordCorrectlyHashed = await compare("123456", org.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with the same email twice", async () => {
    await createOrgUseCase.execute({
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

    await expect(() =>
      createOrgUseCase.execute({
        name: "Cats Orgs",
        author_name: "John",
        email: "org@email.com",
        whatsapp: "99999999",
        password: "123456",
        cep: "91280934",
        city: "Poa",
        state: "Rs",
        neighborhood: "Neighborhood",
        street: "Street",
        latitude: 0,
        longitude: 0,
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
