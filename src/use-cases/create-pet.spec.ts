import { expect, it, describe, beforeEach } from "vitest";

import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { CreatePetUseCase } from "@/use-cases/create-pet";
import { OrgNotFoundError } from "./errors/org-not-found-error";

let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemoryOrgsRepository: InMemoryOrgsRepository;
let createPetUseCase: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryOrgsRepository);
    createPetUseCase = new CreatePetUseCase(
      inMemoryPetsRepository,
      inMemoryOrgsRepository
    );
  });

  it("should be able to create a new pet", async () => {
    const org = await inMemoryOrgsRepository.create({
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

    const { pet } = await createPetUseCase.execute({
      name: "Rex",
      about: "Dog",
      age: "1",
      size: "Medium",
      energy_level: "High",
      environment: "Indoor",
      org_id: org.id,
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet).toEqual(
      expect.objectContaining({
        name: "Rex",
      })
    );
  });

  it("should not be able to create a new pet with a non-existing org", async () => {
    await expect(() =>
      createPetUseCase.execute({
        name: "Rex",
        about: "Dog",
        age: "1",
        size: "Medium",
        energy_level: "High",
        environment: "Indoor",
        org_id: "non-existing-org-id",
      })
    ).rejects.toBeInstanceOf(OrgNotFoundError);
  });
});
