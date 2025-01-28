import { describe, it, beforeEach, expect } from "vitest";

import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { SearchPetUseCase } from "@/use-cases/search-pet";

let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemorOrgsRepository: InMemoryOrgsRepository;
let searchPetUseCase: SearchPetUseCase;

describe("Search Pet Use Case", () => {
  beforeEach(async () => {
    inMemorOrgsRepository = new InMemoryOrgsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemorOrgsRepository);
    searchPetUseCase = new SearchPetUseCase(inMemoryPetsRepository);

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

    const pet = inMemoryPetsRepository.create({
      name: "Rex",
      about: "A brown dog",
      age: "2",
      size: "medium",
      energy_level: "high",
      environment: "indoor",
      org_id: org.id,
    });
  });

  it("should be able to search for pets by city", async () => {
    const { pets } = await searchPetUseCase.execute({
      city: "Porto Alegre",
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Rex",
        }),
      ])
    );
  });

  it("should be able to search pets by city and age", async () => {
    const { pets } = await searchPetUseCase.execute({
      city: "Porto Alegre",
      age: "2",
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          age: "2",
        }),
      ])
    );
  });

  it("should be able to search pets by city and size", async () => {
    const { pets } = await searchPetUseCase.execute({
      city: "Porto Alegre",
      size: "medium",
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          size: "medium",
        }),
      ])
    );
  });

  it("should be able to search pets by city and energy_level", async () => {
    const { pets } = await searchPetUseCase.execute({
      city: "Porto Alegre",
      energy_level: "high",
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          energy_level: "high",
        }),
      ])
    );
  });

  it("should be able to search pets by city and environment", async () => {
    const { pets } = await searchPetUseCase.execute({
      city: "Porto Alegre",
      environment: "indoor",
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          environment: "indoor",
        }),
      ])
    );
  });
});
