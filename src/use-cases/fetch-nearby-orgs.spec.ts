import { expect, it, describe, beforeEach } from "vitest";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { FetchNearbyOrgsUseCase } from "@/use-cases/fetch-nearby-orgs";

let inMemoryOrgsRepository: InMemoryOrgsRepository;
let fetchNearbyOrgsUseCase: FetchNearbyOrgsUseCase;

describe("Fetch Nearby Orgs Use Case", () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    fetchNearbyOrgsUseCase = new FetchNearbyOrgsUseCase(inMemoryOrgsRepository);

    inMemoryOrgsRepository.create({
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
  });

  it("should be able to fetch nearby ORGs", async () => {
    const { orgs } = await fetchNearbyOrgsUseCase.execute({
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(orgs).toHaveLength(1);
    expect(orgs[0].name).toBe("Pets Orgs");
  });

  it("should not be able to fetch ORGs farther than 10 km.", async () => {
    const { orgs } = await fetchNearbyOrgsUseCase.execute({
      userLatitude: 10,
      userLongitude: 10,
    });

    expect(orgs).toHaveLength(0);
  });
});
