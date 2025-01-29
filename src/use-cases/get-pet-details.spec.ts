import { describe, it, beforeEach, expect } from "vitest";

import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { GetPetDetailsUseCase } from "@/use-cases/get-pet-details";
import { PetNotFoundError } from "./errors/pet-not-found-error";

let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemorOrgsRepository: InMemoryOrgsRepository;
let getPetDetailsUseCase: GetPetDetailsUseCase;

describe("Get Pet Details Use Case", () => {
  beforeEach(async () => {
    inMemorOrgsRepository = new InMemoryOrgsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemorOrgsRepository);
    getPetDetailsUseCase = new GetPetDetailsUseCase(inMemoryPetsRepository);

    const org = await inMemorOrgsRepository.create({
      name: "Pets Orgs",
      author_name: "Mauri",
      email: "org@email.com",
      whatsapp: "123456788",
      password: "123456",
      cep: "88888888",
      city: "Porto Alegre",
      state: "Rio Grande do Sul",
      neighborhood: "Neighborhood",
      street: "Street",
      latitude: 0,
      longitude: 0,
    });

    inMemoryPetsRepository.create({
      id: "id-1",
      name: "Rex",
      about: "A brown dog",
      age: "2",
      size: "medium",
      energy_level: "high",
      environment: "indoor",
      org_id: org.id,
    });

    inMemoryPetsRepository.create({
      id: "id-2",
      name: "Cat",
      about: "A white cat",
      age: "1",
      size: "small",
      energy_level: "medium",
      environment: "indoor",
      org_id: org.id,
    });
  });

  it("should be able to get details of a pet by id", async () => {
    const { pet } = await getPetDetailsUseCase.execute({
      pet_id: "id-1",
    });

    expect(pet).toEqual(
      expect.objectContaining({
        name: "Rex",
      })
    );
  });

  it("should not be able to get details of a pet with a wrong id", async () => {
    await expect(() =>
      getPetDetailsUseCase.execute({
        pet_id: "id-4",
      })
    ).rejects.toBeInstanceOf(PetNotFoundError);
  });
});
